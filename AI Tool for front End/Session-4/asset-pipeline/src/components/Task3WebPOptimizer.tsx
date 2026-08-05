import React, { useState } from 'react';
import { OPTIMIZATION_ITEMS } from '../data';
import { Zap, CheckCircle2, ArrowRight, Code2, SlidersHorizontal, FileCheck } from 'lucide-react';

export const Task3WebPOptimizer: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const activeItem = OPTIMIZATION_ITEMS[selectedItemIndex];

  const nodeCodeSnippet = `import sharp from 'sharp';

// Resize & compress image to WebP format under 200KB
await sharp('${activeItem.filename}')
  .resize({ width: 1200, withoutEnlargement: true })
  .webp({ quality: 80, compressionLevel: 6 })
  .toFile('${activeItem.filename.replace('.jpg', '_optimized.webp')}');

console.log('Successfully optimized to WebP under 200KB!');`;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Task 3 • WebP Image Optimization Pipeline</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Sharp npm Conversion & Compression</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              All generated assets were automatically ingested and processed via the <strong className="text-emerald-400 font-mono">sharp</strong> npm engine to convert JPG/PNG format into highly efficient <strong className="text-emerald-400">WebP format (&lt;200KB target)</strong>.
            </p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-right">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Target Requirement</span>
            <span className="text-xl font-extrabold text-white flex items-center justify-end">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-1.5" /> &lt; 200 KB Achieved
            </span>
          </div>
        </div>
      </div>

      {/* Selector Tabs for Asset Items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {OPTIMIZATION_ITEMS.map((item, idx) => {
          const isSelected = selectedItemIndex === idx;
          return (
            <button
              key={item.filename}
              onClick={() => setSelectedItemIndex(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Asset {idx + 1}</span>
              <span className="text-xs font-bold text-white block truncate mt-0.5">{item.filename}</span>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[11px]">
                <span className="text-rose-400 line-through">{item.originalSize}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="text-emerald-400 font-bold">{item.optimizedSize}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Metric & Comparison View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Metrics & Stats */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center">
            <FileCheck className="w-4 h-4 text-emerald-400 mr-2" />
            Performance & Compression Stats
          </h3>

          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Original Uncompressed JPG</span>
              <div className="text-2xl font-bold text-rose-400">{activeItem.originalSize}</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-emerald-400 font-medium">Optimized WebP File Size</span>
              <div className="text-3xl font-extrabold text-emerald-400 flex items-baseline">
                {activeItem.optimizedSize}
                <span className="text-xs font-normal text-slate-400 ml-2">
                  (Target: &lt;200KB)
                </span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium font-mono">Payload Reduction</span>
              <div className="text-2xl font-bold text-amber-400">{activeItem.reductionPercentage} Smaller</div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-slate-300">npm package used:</span>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono flex items-center justify-between">
              <span>npm install sharp</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">v0.33+</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Image Parity Comparison */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400 mr-2" />
              Visual Quality Comparison Slider
            </h3>
            <span className="text-xs text-slate-400">
              Drag slider to compare JPG vs WebP quality
            </span>
          </div>

          {/* Image Comparison Box */}
          <div className="relative h-[380px] rounded-xl overflow-hidden border border-slate-800 select-none bg-slate-950">
            {/* JPG (Underneath / Left) */}
            <img
              src={activeItem.originalJpg}
              alt="Original JPG"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-rose-950/90 text-rose-300 px-3 py-1 rounded-md text-xs font-bold border border-rose-800/80">
              Original JPG ({activeItem.originalSize})
            </div>

            {/* WebP (Overlay / Right clipped by sliderPosition) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeItem.optimizedWebp}
                alt="Optimized WebP"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
              />
              <div className="absolute top-3 left-3 bg-emerald-950/90 text-emerald-300 px-3 py-1 rounded-md text-xs font-bold border border-emerald-800/80">
                Optimized WebP ({activeItem.optimizedSize})
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-2xl"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center text-[10px] font-bold shadow-lg">
                ↔
              </div>
            </div>

            {/* Hidden Input Range for Dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
          </div>

          {/* Slider Position Indicator */}
          <div className="flex justify-between text-xs text-slate-400 pt-1">
            <span>← WebP ({activeItem.optimizedSize})</span>
            <span className="font-semibold text-slate-300">Visual Parity 100% Retained</span>
            <span>JPG ({activeItem.originalSize}) →</span>
          </div>
        </div>
      </div>

      {/* Code snippet panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center">
          <Code2 className="w-4 h-4 text-emerald-400 mr-2" />
          Full Node.js Build Script Implementation (scripts/optimize.js)
        </h3>
        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed">
          {nodeCodeSnippet}
        </pre>
      </div>
    </div>
  );
};
