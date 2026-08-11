import React, { useState } from 'react';
import { scopeData, ecommerceFeatures, resumeFeatures, flowSteps, capstoneChoiceReasoning, themeComparisons } from '../data/assignmentData';
import { X, Copy, Check, FileText, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssignmentExporterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssignmentExporter: React.FC<AssignmentExporterProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate complete Markdown text
  const markdownText = `# CAPSTONE PORTFOLIO ASSIGNMENT SUBMISSION REPORT

## TASK 1: DAILY APP PROJECT SCOPE STATEMENT
**Selected Application:** ${scopeData.originalApp} (React Edition: ${scopeData.appName})

**Problem Statement:**
${scopeData.problemStatement}

**Proposed React Solution:**
${scopeData.proposedSolution}

**Main Target Users & Personas:**
${scopeData.targetAudience.map((t, idx) => `
${idx + 1}. **${t.persona}**: ${t.description}
   - Key Needs: ${t.keyNeeds.join(', ')}
`).join('')}

---

## TASK 2: SMART E-COMMERCE DASHBOARD (FLIPKART SELLER PANEL)
**5 Core Features with One-Line Value Explanations:**

${ecommerceFeatures.map((f) => `
${f.id}. **${f.title}**
   - *How it helps the user:* ${f.oneLiner}
   - *Detailed Function:* ${f.detailedExplanation}
`).join('')}

---

## TASK 3: AI-POWERED RESUME BUILDER (5 UNIQUE AI FEATURES)
**Brainstormed AI Features Beyond Standard Forms:**

${resumeFeatures.map((f) => `
${f.id}. **${f.title}**
   - *Core AI Capability:* ${f.oneLiner}
   - *Detailed Function:* ${f.detailedExplanation}
`).join('')}

---

## TASK 4: USER INTERACTION FLOW DIAGRAM
**4-Step Interaction Lifecycle (Landing Page -> Feature Completion -> Logout):**

${flowSteps.map((s) => `
Step ${s.id}: **${s.title}** (${s.actor})
- Description: ${s.description}
- Key Actions: ${s.details.join('; ')}
`).join('')}

---

## TASK 5: CAPSTONE PROJECT THEME SELECTION & JUSTIFICATION
**Chosen Capstone Theme:** ${capstoneChoiceReasoning.chosenTheme}

**Reason 1 (${capstoneChoiceReasoning.reason1Title}):**
${capstoneChoiceReasoning.reason1Description}

**Reason 2 (${capstoneChoiceReasoning.reason2Title}):**
${capstoneChoiceReasoning.reason2Description}

**Theme Comparison Summary Matrix:**
${themeComparisons.map((t) => `- **${t.name}**: Complexity: ${t.complexity} | Focus: ${t.focus}`).join('\n')}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText);
    setCopied(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-fadeIn overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Assignment Submission Text Report</h3>
              <p className="text-xs text-slate-400">Formatted Markdown text ready for copy-pasting or document submission</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Box */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-slate-950 space-y-4">
          <pre className="whitespace-pre-wrap leading-relaxed">{markdownText}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-900">
          <span className="text-xs text-slate-400">Word Count: ~650 words • All 5 Tasks Included</span>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              Close
            </button>

            <button
              onClick={handleCopy}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 hover:from-emerald-300 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Full Text Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
