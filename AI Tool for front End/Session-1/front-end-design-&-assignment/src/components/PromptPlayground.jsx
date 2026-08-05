import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  Code2, 
  Layers, 
  Lightbulb 
} from 'lucide-react';

export const PromptPlayground: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(
    'Generate an HTML outline for a Zomato-style restaurant card grid with online ordering filters, star rating badges, average delivery times, and discount offers.'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [outputCode, setOutputCode] = useState<string | null>(null);

  const samplePrompts = [
    {
      label: 'Flipkart Product Card Grid',
      text: 'Create a 4-column responsive product grid for a Flipkart app listing headphones, showing F-Assured badge, discount price, and wishlist icon in Tailwind CSS HTML.'
    },
    {
      label: 'Myntra Responsive Nav',
      text: 'Write a responsive Myntra navbar with logo, search bar, Profile, Wishlist, Cart badge, and mobile drawer in React JSX.'
    },
    {
      label: 'Zomato Restaurant Card',
      text: 'Generate a Zomato-style restaurant listing card with cuisine tags, safety delivery badge, distance ETA, rating pill, and safety compliance info in Tailwind CSS.'
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate generation or construct structured template based on prompt keywords
    setTimeout(() => {
      let code = '';
      if (prompt.toLowerCase().includes('zomato') || prompt.toLowerCase().includes('restaurant')) {
        code = `<div class="max-w-md bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden group">
  <div class="relative h-48 overflow-hidden">
    <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500" alt="Restaurant" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    <span class="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">50% OFF up to ₹100</span>
    <span class="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded flex items-center gap-1 font-semibold">25 min • 3 km</span>
  </div>
  <div class="p-4">
    <div class="flex items-center justify-between">
      <h3 class="text-base font-bold text-gray-900 group-hover:text-red-600 transition">Bikanervala Sweets & Snacks</h3>
      <span class="bg-green-700 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">4.3 ★</span>
    </div>
    <p class="text-xs text-gray-500 mt-1">North Indian, Street Food, Mithai, Desserts</p>
    <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
      <span class="text-emerald-600 font-medium">✓ Pure Veg • Safety Verified</span>
      <span class="font-bold text-gray-800">₹350 for two</span>
    </div>
  </div>
</div>`;
      } else if (prompt.toLowerCase().includes('myntra') || prompt.toLowerCase().includes('navbar')) {
        code = `<nav class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
  <div class="flex items-center space-x-8">
    <span class="text-xl font-black text-[#ff3f6c] tracking-wider">MYNTRA</span>
    <div class="hidden md:flex space-x-6 text-xs font-bold uppercase text-gray-800">
      <a href="#" class="hover:text-[#ff3f6c]">MEN</a>
      <a href="#" class="hover:text-[#ff3f6c]">WOMEN</a>
      <a href="#" class="hover:text-[#ff3f6c]">KIDS</a>
    </div>
  </div>
  <div class="flex-1 max-w-sm mx-4">
    <input type="text" placeholder="Search for products, brands and more" class="w-full bg-gray-100 text-xs px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#ff3f6c]" />
  </div>
  <div class="flex items-center space-x-4 text-xs font-semibold">
    <a href="#" class="hover:text-[#ff3f6c]">Profile</a>
    <a href="#" class="hover:text-[#ff3f6c]">Wishlist</a>
    <a href="#" class="hover:text-[#ff3f6c]">Bag (2)</a>
  </div>
</nav>`;
      } else {
        code = `<div class="bg-white p-6 rounded-xl border shadow-sm">
  <h2 class="text-lg font-bold text-gray-900">Custom Generated UI Component</h2>
  <p class="text-xs text-gray-500 mt-1">Generated based on prompt: "${prompt}"</p>
  <div class="mt-4 p-4 bg-blue-50 rounded-lg text-blue-900 text-xs font-mono">
    Ready for integration into React / Tailwind CSS project.
  </div>
</div>`;
      }
      setOutputCode(code);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    if (outputCode) {
      navigator.clipboard.writeText(outputCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div class="space-y-6">
      
      {/* Title Header */}
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
              <span>Interactive Prompt Studio</span> • <span>Gemini AI Engine</span>
            </div>
            <h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2">
              Front-End UI Prompt Tester & Code Generator
            </h2>
          </div>
        </div>

        <p class="text-slate-300 text-sm leading-relaxed max-w-3xl">
          Test prompt variations live to see how different layout constraints and structural instructions transform generated HTML outlines and React JSX components.
        </p>
      </div>

      {/* Main Studio Grid */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Prompt Input */}
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              <Terminal class="w-4 h-4 text-amber-400" /> Enter Prompt Instructions
            </h3>
            <span class="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
              Tailwind CSS + React
            </span>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition leading-relaxed"
            placeholder="Describe your UI outline requirements..."
          />

          {/* Quick Presets */}
          <div>
            <p class="text-xs text-slate-400 font-medium mb-2 flex items-center gap-1">
              <Lightbulb class="w-3.5 h-3.5 text-amber-400" /> Try Preset Prompts:
            </p>
            <div class="flex flex-wrap gap-2">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(p.text)}
                  class="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded border border-slate-700 transition font-sans text-left"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            class="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-lg text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 fill-current ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating UI Structure...' : 'Generate HTML / JSX Outline'}
          </button>
        </div>

        {/* Right Column: Code & Preview Output */}
        <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div class="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <span class="text-xs font-mono text-slate-300 flex items-center gap-2">
                <Code2 class="w-4 h-4 text-emerald-400" /> Generated Code Output
              </span>
              {outputCode && (
                <button
                  onClick={handleCopy}
                  class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copied ? <Check class="w-3.5 h-3.5" /> : <Copy class="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              )}
            </div>

            <div class="p-4">
              {outputCode ? (
                <div class="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-200 max-h-[320px] overflow-y-auto leading-relaxed border border-slate-800">
                  <pre><code>{outputCode}</code></pre>
                </div>
              ) : (
                <div class="h-[250px] bg-slate-950/50 rounded-lg border border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 text-xs">
                  <Sparkles className="w-8 h-8 text-slate-700 mb-2 animate-pulse" />
                  <p>Click "Generate HTML / JSX Outline" to generate custom component code!</p>
                </div>
              )}
            </div>
          </div>

          {outputCode && (
            <div class="p-4 bg-slate-950 border-t border-slate-800">
              <p class="text-[11px] text-slate-400">
                <strong class="text-slate-200">Tip:</strong> You can copy this code and paste it directly into your HTML files or React components.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
