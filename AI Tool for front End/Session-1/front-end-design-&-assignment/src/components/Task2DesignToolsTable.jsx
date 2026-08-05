import React, { useState } from 'react';
import { DesignToolComparison } from '../types';
import { 
  Table, 
  Sparkles, 
  Zap, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Wand2, 
  Cpu, 
  MousePointerClick 
} from 'lucide-react';

export const Task2DesignToolsTable: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const comparisons: DesignToolComparison[] = [
    {
      feature: '1. Wireframe & UI Layout Generation',
      figmaAi: 'Generates editable vector UI frames directly inside Figma based on text prompts or existing design libraries while preserving layers.',
      uizard: 'Converts hand-drawn paper sketches, screenshots, or text prompts instantly into high-fidelity editable web/mobile screens via Autodesigner.',
      manualTools: 'Designers must manually draw shapes, position frames, write placeholder text, and construct components from scratch line by line.',
      impactScore: '95% Faster Mockups',
      speedupMultiplier: '10x Speedup'
    },
    {
      feature: '2. Design System & Style Automation',
      figmaAi: 'Automatically applies company design tokens, colors, variables, typography hierarchy, and auto-layout paddings to generated components.',
      uizard: 'Auto-generates cohesive color themes, typography pairings, and button styles based on uploaded brand guidelines or image assets.',
      manualTools: 'Designers must manually create and organize component variants, define text styles, assign color variables, and configure auto-layout spacing rules.',
      impactScore: 'Consistency Guaranteed',
      speedupMultiplier: '5x Speedup'
    },
    {
      feature: '3. Responsive Variants & Asset Management',
      figmaAi: 'Uses AI rename and layer organization to re-structure messy vector trees and generate mobile/tablet responsive breakpoints instantly.',
      uizard: 'Automatically adapts desktop layouts to mobile screens and scales image assets/icons smoothly without breaking visual alignment.',
      manualTools: 'Requires manual duplicate-and-resize workflows, manually renaming 100+ layers, and tweaking constraints for every screen size.',
      impactScore: '80% Less Maintenance',
      speedupMultiplier: '6x Speedup'
    },
    {
      feature: '4. Interactive Prototyping & Flow Wiring',
      figmaAi: 'Predicts user paths and automatically connects screens with animated vector transitions, modal interactions, and micro-animations.',
      uizard: 'Generates multi-screen navigation flows and clickable interactive prototypes automatically during layout generation.',
      manualTools: 'Designers must manually draw interaction noodles between every frame, set trigger types (On Click, On Hover), and configure transition timing values.',
      impactScore: 'Instant Interactive Demos',
      speedupMultiplier: '8x Speedup'
    },
    {
      feature: '5. Design-to-Code & Developer Handoff',
      figmaAi: 'Figma Dev Mode AI inspects designs and outputs production-ready Tailwind CSS, React JSX, and HTML code snippets with flexbox properties.',
      uizard: 'Exports complete React/HTML/CSS code, downloadable design assets, and component specs directly ready for front-end integration.',
      manualTools: 'Developers must inspect raw pixel coordinates, estimate rem/em values, manually convert styles to CSS, and re-implement layouts.',
      impactScore: 'Seamless Dev Bridge',
      speedupMultiplier: '7x Speedup'
    }
  ];

  return (
    <div class="space-y-6">
      
      {/* Title & Overview Card */}
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
              <span>Task 2 of 4</span> • <span>Research & Comparative Analysis</span>
            </div>
            <h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2">
              Figma AI vs Uizard vs Manual Design Tools
            </h2>
          </div>
          <div class="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs px-3 py-1.5 rounded-lg font-mono">
            <Zap class="w-4 h-4 text-purple-400" /> Average 7x-10x Acceleration
          </div>
        </div>

        <p class="text-slate-300 text-sm leading-relaxed max-w-4xl">
          Modern AI design tools fundamentally shift front-end creation from manual pixel pushing to prompt-driven architectural orchestration. 
          While traditional tools rely entirely on human effort for every rectangle and layout constraint, <strong>Figma AI</strong> accelerates vector design system alignment, and <strong>Uizard</strong> transforms sketches and text directly into clickable UI prototypes.
        </p>

        {/* Feature Scorecards */}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div class="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Cpu class="w-5 h-5" />
            </div>
            <div>
              <p class="text-xs text-slate-400 font-medium">Figma AI Focus</p>
              <p class="text-sm font-bold text-slate-100">Design Systems & Vector Precision</p>
            </div>
          </div>

          <div class="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
              <Wand2 class="w-5 h-5" />
            </div>
            <div>
              <p class="text-xs text-slate-400 font-medium">Uizard Focus</p>
              <p class="text-sm font-bold text-slate-100">Sketch-to-UI & Rapid Ideation</p>
            </div>
          </div>

          <div class="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-bold">
              <MousePointerClick class="w-5 h-5" />
            </div>
            <div>
              <p class="text-xs text-slate-400 font-medium">Manual Baseline</p>
              <p class="text-sm font-bold text-slate-100">Pixel-by-Pixel Execution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div class="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <Table class="w-4 h-4 text-purple-400" />
            <h3 class="text-sm font-bold text-slate-100">Comparison Table: AI UI Design vs Manual Tools</h3>
          </div>
          <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded">5 Key Dimensions</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-950/80 text-slate-300 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                <th class="p-4 w-1/5">UI Design Dimension</th>
                <th class="p-4 w-1/4 text-blue-300 border-l border-slate-800/80">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-blue-400"></span> Figma AI
                  </div>
                </th>
                <th class="p-4 w-1/4 text-pink-300 border-l border-slate-800/80">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-pink-400"></span> Uizard
                  </div>
                </th>
                <th class="p-4 w-1/4 text-slate-400 border-l border-slate-800/80">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-slate-500"></span> Traditional Manual Tools
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-xs leading-relaxed">
              {comparisons.map((item, index) => (
                <tr key={index} class="hover:bg-slate-800/40 transition">
                  {/* Dimension Name */}
                  <td class="p-4 align-top font-bold text-slate-200">
                    <p class="text-sm text-slate-100 mb-1">{item.feature}</p>
                    <span class="inline-block bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold mt-1">
                      {item.speedupMultiplier}
                    </span>
                  </td>

                  {/* Figma AI */}
                  <td class="p-4 align-top text-slate-300 border-l border-slate-800/80 bg-blue-950/10">
                    <p>{item.figmaAi}</p>
                    <div class="mt-2 text-[10px] text-blue-400 font-mono font-semibold flex items-center gap-1">
                      <CheckCircle2 class="w-3 h-3 text-blue-400" /> Vector Layer Preserved
                    </div>
                  </td>

                  {/* Uizard */}
                  <td class="p-4 align-top text-slate-300 border-l border-slate-800/80 bg-pink-950/10">
                    <p>{item.uizard}</p>
                    <div class="mt-2 text-[10px] text-pink-400 font-mono font-semibold flex items-center gap-1">
                      <CheckCircle2 class="w-3 h-3 text-pink-400" /> Sketch & Prompt to Screen
                    </div>
                  </td>

                  {/* Manual Tools */}
                  <td class="p-4 align-top text-slate-400 border-l border-slate-800/80">
                    <p>{item.manualTools}</p>
                    <div class="mt-2 text-[10px] text-amber-400 font-mono font-semibold flex items-center gap-1">
                      <XCircle class="w-3 h-3 text-amber-500" /> High Friction & Time Intensive
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytical Takeaway Summary */}
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white">
        <h3 class="text-base font-bold text-slate-100 mb-3 flex items-center gap-2">
          <Sparkles class="w-5 h-5 text-indigo-400" /> Key Architectural Takeaways for Designers & Front-End Teams
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
            <h4 class="font-bold text-indigo-300 mb-1">When to Use Figma AI:</h4>
            <p>
              Ideal for established product teams operating inside an existing design system. Figma AI excels at contextual autocomplete, token variable mapping, layer cleanup, and generating Dev Mode React/Tailwind code without breaking vector component integrity.
            </p>
          </div>

          <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
            <h4 class="font-bold text-pink-300 mb-1">When to Use Uizard:</h4>
            <p>
              Ideal for rapid 0-to-1 prototyping, hackathons, client discovery workshops, and non-designers. Uizard transforms paper whiteboard sketches or text descriptions directly into fully interactive wireframes in seconds.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
