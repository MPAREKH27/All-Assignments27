import React, { useState } from 'react';
import { SURPRISING_FEATURES } from '../data/mockData';
import { SurprisingFeature } from '../types';
import uizardFoodImg from '../assets/images/uizard_food_app_1785924074993.jpg';
import { Sparkles, Download, Lightbulb, Search, Utensils, Star, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface Task2Props {
  onUpdateNotes: (notes: string) => void;
}

export const Task2UizardFoodApp: React.FC<Task2Props> = ({ onUpdateNotes }) => {
  const [selectedFeature, setSelectedFeature] = useState<SurprisingFeature>(SURPRISING_FEATURES[0]);
  const [userNote, setUserNote] = useState<string>(
    "I was especially surprised by how Uizard's AI engine automatically grouped contextual search filters ('Under 30 mins', 'Top Rated 4.5+') directly underneath the main search field. Rather than hiding filters inside a side menu, the AI prioritized immediate meal discovery and friction-free ordering right on the homepage hero."
  );
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const handleDownloadPreview = () => {
    const link = document.createElement('a');
    link.href = uizardFoodImg;
    link.download = 'uizard_food_delivery_homepage_prototype.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveNotes = () => {
    setIsSaved(true);
    onUpdateNotes(userNote);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Task 2: Uizard Prototype & AI Layout Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Food Delivery App Homepage Generator
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Generated via Uizard prompt: <span className="text-amber-300 font-mono italic">"Create a food delivery app homepage"</span>. Analyze auto-generated search, banner, and restaurant layout hierarchy and document unexpected AI design features.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPreview}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-lg shadow-amber-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Preview Image</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas vs Feature Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Prototype Visual Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-300 font-bold">
              <Utensils className="w-4 h-4 text-amber-400" />
              <span>Uizard AI Generated Prototype Canvas</span>
            </div>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
              Auto-Generated Layout
            </span>
          </div>

          {/* Prototype Frame Container */}
          <div className="relative rounded-xl border-2 border-slate-700 overflow-hidden bg-slate-950 group">
            <img
              src={uizardFoodImg}
              alt="Uizard Food Delivery App Prototype"
              className="w-full h-auto object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />

            {/* Interactive Hotspot Indicators */}
            {SURPRISING_FEATURES.map((feat, idx) => {
              const isSelected = selectedFeature.id === feat.id;
              return (
                <div
                  key={feat.id}
                  onClick={() => setSelectedFeature(feat)}
                  style={{
                    left: `${feat.highlightCoordinates.x}%`,
                    top: `${feat.highlightCoordinates.y}%`,
                    width: `${feat.highlightCoordinates.width}%`,
                    height: `${feat.highlightCoordinates.height}%`,
                  }}
                  className={`absolute border-2 rounded-lg cursor-pointer transition-all flex items-center justify-start p-1 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/40 z-30'
                      : 'border-amber-500/50 bg-amber-500/5 hover:bg-amber-500/15 z-20'
                  }`}
                >
                  <span className="bg-amber-400 text-slate-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded ml-1 hidden sm:inline truncate max-w-[150px]">
                    {feat.category}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="flex items-center space-x-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Click any numbered hotspot on the prototype to inspect AI layout logic</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">Uizard Layout Engine</span>
          </div>
        </div>

        {/* Feature Inspector & Student Analysis Notes (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Selected Feature Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Feature {SURPRISING_FEATURES.findIndex((f) => f.id === selectedFeature.id) + 1} Inspector</span>
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                {selectedFeature.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">{selectedFeature.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              {selectedFeature.description}
            </p>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 space-y-1">
              <div className="text-xs font-bold text-amber-300 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Layout Mechanism Insight:</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {selectedFeature.aiInsight}
              </p>
            </div>

            {/* Feature Selector Pills */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Explore All Auto-Generated Sections:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {SURPRISING_FEATURES.map((feat, idx) => (
                  <button
                    key={feat.id}
                    onClick={() => setSelectedFeature(feat)}
                    className={`p-2.5 rounded-xl text-left text-xs font-medium transition flex items-center justify-between ${
                      selectedFeature.id === feat.id
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200'
                        : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center space-x-2 truncate">
                      <span className="w-4 h-4 rounded-full bg-slate-800 text-amber-400 text-[10px] font-bold flex items-center justify-center border border-slate-700">
                        {idx + 1}
                      </span>
                      <span className="truncate">{feat.title}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Note One Feature of the Layout that Surprised You */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Assignment Reflection: Surprising Feature Note</span>
              </label>
              {isSaved && <span className="text-[10px] text-emerald-400 font-semibold flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> Saved to Submission</span>}
            </div>

            <textarea
              value={userNote}
              onChange={(e) => {
                setUserNote(e.target.value);
                setIsSaved(false);
              }}
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-sans resize-none"
              placeholder="Describe the layout feature that surprised you..."
            />

            <button
              onClick={handleSaveNotes}
              className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Save Reflection to Assignment Folder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
