import React from 'react';
import { ZomatoAiUseCase } from '../types';
import { 
  Zap, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Utensils, 
  Code2, 
  Accessibility, 
  Lock 
} from 'lucide-react';

export const Task3ZomatoAiEthics: React.FC = () => {
  const useCases: ZomatoAiUseCase[] = [
    {
      id: 1,
      useCase: '1. Instant Mock Data & Restaurant Review Schema Generation',
      description: 'Using ChatGPT or Copilot to quickly generate rich, structured JSON mock datasets for hundreds of restaurants—including food menus, dish tags (Veg/Non-Veg, Spicy), delivery times, ratings, and customer reviews.',
      timeSaved: 'Saves 6-8 hours of manual data entry',
      ethicalRiskTitle: 'Ethical Risk: AI Hallucination & Fake Review / Allergen Misrepresentation',
      ethicalRiskDescription: 'AI generators can hallucinate false dietary tags (e.g., mislabeling non-veg items as pure vegetarian or gluten-free) or generate overly biased artificial customer reviews that distort restaurant reputations or cause health hazards.',
      riskCategory: 'Bias & Hallucination',
      mitigationStrategy: 'Implement strict human validation for dietary/health data and mark AI mock data clearly as simulated placeholders.'
    },
    {
      id: 2,
      useCase: '2. Rapid Component Boilerplate & Complex UI Logic (Cart & Adders)',
      description: 'Generating modular React/Tailwind components for Zomato-style restaurant cards, quantity selectors with (+/-) buttons, offer code banners, and interactive dish modal dialogs.',
      timeSaved: 'Saves 10-12 hours of front-end UI coding',
      ethicalRiskTitle: 'Ethical Risk: IP & Copyright Infringement of Commercial UI Code',
      ethicalRiskDescription: 'Copilot or ChatGPT might output exact proprietary code snippets, proprietary styling logic, or copyrighted asset references scraped from existing commercial food delivery platforms without proper licensing or attribution.',
      riskCategory: 'IP/Copyright',
      mitigationStrategy: 'Run automated license compliance scanners and audit AI-generated code to ensure originality before pushing to production.'
    },
    {
      id: 3,
      useCase: '3. Automated Accessibility (a11y) & Micro-Copy Optimization',
      description: 'Auto-generating screen-reader friendly ARIA labels (`aria-expanded`, `aria-label="Rating 4.2 out of 5"`), alt text for dish images, and keyboard navigation triggers for review modals.',
      timeSaved: 'Saves 4-5 hours of accessibility compliance audit',
      ethicalRiskTitle: 'Ethical Risk: Automated Dark Patterns & Unintentional Privacy Leaks',
      ethicalRiskDescription: 'AI models trained on commercial conversion optimization may automatically suggest subtle "Dark Patterns" (e.g., pre-selecting platform fees, hiding cancellation policies) or transmit confidential user data if real customer review analytics are pasted into public AI models.',
      riskCategory: 'Privacy & Security',
      mitigationStrategy: 'Enforce ethical UX design guidelines forbidding dark patterns and sanitize all prompts to prevent sharing proprietary/user PII.'
    }
  ];

  return (
    <div class="space-y-6">
      
      {/* Title Header */}
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
              <span>Task 3 of 4</span> • <span>Zomato Case Study & AI Governance</span>
            </div>
            <h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2">
              AI Speedups for Front-End Development & Ethical Risks
            </h2>
          </div>
          <div class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs px-3 py-1.5 rounded-lg font-mono">
            <Utensils class="w-4 h-4 text-emerald-400" /> Zomato Front-End Architecture
          </div>
        </div>

        <p class="text-slate-300 text-sm leading-relaxed max-w-4xl">
          AI coding assistants like GitHub Copilot and ChatGPT revolutionize the speed at which developers build data-dense e-commerce applications like Zomato. However, every speedup vector brings distinct ethical risks ranging from copyright infringement to dark patterns and fake review hallucinations.
        </p>
      </div>

      {/* 3 Speedups & 3 Ethical Risks Detailed Cards */}
      <div class="space-y-6">
        {useCases.map((item) => (
          <div key={item.id} class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            
            {/* Header: Use Case */}
            <div class="p-5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                  #{item.id}
                </div>
                <h3 class="text-base font-bold text-white">{item.useCase}</h3>
              </div>

              <span class="bg-emerald-500/20 text-emerald-300 text-xs font-mono px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Zap class="w-3.5 h-3.5 text-emerald-400" /> {item.timeSaved}
              </span>
            </div>

            {/* Content Body: Split into Speedup & Ethical Risk */}
            <div class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              
              {/* Left Column: Speedup Advantage */}
              <div class="p-5 space-y-3 bg-slate-900/40">
                <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                  <CheckCircle2 class="w-4 h-4 text-indigo-400" /> Front-End Development Speedup
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Right Column: Ethical Risk & Mitigation */}
              <div class="p-5 space-y-3 bg-red-950/10">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
                    <ShieldAlert class="w-4 h-4 text-red-400" /> {item.ethicalRiskTitle}
                  </div>
                  <span class="text-[10px] font-mono font-bold bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                    {item.riskCategory}
                  </span>
                </div>

                <p class="text-xs text-slate-300 leading-relaxed">
                  {item.ethicalRiskDescription}
                </p>

                <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800 mt-2 text-xs text-amber-300 flex items-start gap-2">
                  <AlertTriangle class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong class="text-slate-200">Mitigation Strategy:</strong> {item.mitigationStrategy}
                  </div>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Summary Matrix Card */}
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white">
        <h3 class="text-base font-bold text-slate-100 mb-3 flex items-center gap-2">
          <Sparkles class="w-5 h-5 text-emerald-400" /> Responsible AI Guidelines for Front-End Engineers
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
            <h4 class="font-bold text-indigo-400 mb-1 flex items-center gap-1">
              <Code2 class="w-4 h-4" /> Code Auditing
            </h4>
            <p>Always review AI-generated React components for security flaws, hardcoded secrets, and proper accessibility attributes before merging.</p>
          </div>

          <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
            <h4 class="font-bold text-amber-400 mb-1 flex items-center gap-1">
              <ShieldAlert class="w-4 h-4" /> Anti-Dark Pattern Check
            </h4>
            <p>Audit generated micro-copy to ensure price transparency, clear cancellation disclosures, and unbiased food rating indicators.</p>
          </div>

          <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
            <h4 class="font-bold text-emerald-400 mb-1 flex items-center gap-1">
              <Lock class="w-4 h-4" /> Privacy Boundary
            </h4>
            <p>Never pass real customer records or unreleased Zomato restaurant partner API keys into public AI prompt windows.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
