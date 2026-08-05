import React, { useState } from 'react';
import { APP_ICONS } from '../data';
import { Download, Copy, Check, Smartphone, Sparkles, FileImage, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const Task1AppIcons: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedIconIndex, setSelectedIconIndex] = useState<number>(0);
  const [iconFormat, setIconFormat] = useState<'png' | 'webp' | 'jpg'>('webp');

  const copyPrompt = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const activeIcon = APP_ICONS[selectedIconIndex];

  return (
    <div className="space-y-8">
      {/* Task Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-rose-400 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Task 1 • Custom App Icon Generation</span>
            </div>
            <h2 className="text-2xl font-bold text-white">3 Custom App Icons Suite</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Engineered with detailed 3D isometric & acrylic prompts. Saved in high-res PNG format & optimized WebP for mobile and web app integration.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 text-xs">
            <span className="text-slate-400 px-2 font-medium">Format:</span>
            {(['webp', 'png', 'jpg'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setIconFormat(fmt)}
                className={`px-3 py-1 rounded-lg uppercase text-[11px] font-bold transition-all ${
                  iconFormat === fmt
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of 3 App Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {APP_ICONS.map((icon, idx) => {
          const isSelected = selectedIconIndex === idx;
          const currentImg =
            iconFormat === 'webp'
              ? icon.webpUrl
              : iconFormat === 'png'
              ? icon.pngUrl
              : icon.jpgUrl;

          const currentSize =
            iconFormat === 'webp'
              ? icon.webpSize
              : iconFormat === 'png'
              ? icon.pngSize
              : icon.jpgSize;

          return (
            <motion.div
              key={icon.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                isSelected
                  ? 'border-rose-500 ring-2 ring-rose-500/20 shadow-xl shadow-rose-950/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Icon Image Display Box */}
                <div
                  onClick={() => setSelectedIconIndex(idx)}
                  className="cursor-pointer group relative bg-slate-950 rounded-xl p-6 border border-slate-800 flex items-center justify-center overflow-hidden mb-4"
                >
                  <img
                    src={currentImg}
                    alt={icon.name}
                    referrerPolicy="no-referrer"
                    className="w-44 h-44 object-contain rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-[11px] font-mono text-slate-300">
                    {iconFormat.toUpperCase()} • {currentSize}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-rose-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Preview in Launcher
                  </div>
                </div>

                {/* Title and Category */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{icon.name}</h3>
                    <p className="text-xs text-rose-400 font-medium mt-0.5">{icon.category}</p>
                  </div>
                  <button
                    onClick={() => copyPrompt(icon.id, icon.prompt)}
                    className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors border border-slate-700/50"
                    title="Copy Prompt"
                  >
                    {copiedId === icon.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Prompt Box */}
                <div className="mt-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Generation Prompt
                  </span>
                  <p className="text-xs text-slate-300 line-clamp-3 italic leading-relaxed">
                    "{icon.prompt}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() =>
                    handleDownload(
                      icon.pngUrl,
                      `${icon.id}_highres.png`
                    )
                  }
                  className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-md shadow-rose-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PNG</span>
                </button>
                <button
                  onClick={() =>
                    handleDownload(
                      icon.webpUrl,
                      `${icon.id}_optimized.webp`
                    )
                  }
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white py-2 px-3 rounded-xl text-xs font-medium flex items-center space-x-1 border border-slate-700/60 transition-colors"
                  title="Download WebP Format (<36KB)"
                >
                  <FileImage className="w-3.5 h-3.5 text-rose-400" />
                  <span>WebP</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Mobile Home Screen Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <Smartphone className="w-5 h-5 text-rose-400" />
          <div>
            <h3 className="text-base font-bold text-white">Live Mobile Home Screen Simulator</h3>
            <p className="text-xs text-slate-400">See how your custom generated icons render on a modern smartphone app launcher grid.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
          {/* Phone Shell */}
          <div className="w-72 bg-slate-950 rounded-[40px] p-4 border-4 border-slate-800 shadow-2xl relative">
            {/* Speaker notch */}
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-6" />

            {/* Simulated App Grid */}
            <div className="grid grid-cols-3 gap-4 px-2 py-4">
              {APP_ICONS.map((icon, idx) => {
                const isActive = selectedIconIndex === idx;
                return (
                  <div
                    key={icon.id}
                    onClick={() => setSelectedIconIndex(idx)}
                    className={`flex flex-col items-center cursor-pointer p-2 rounded-2xl transition-all ${
                      isActive ? 'bg-white/10 ring-2 ring-rose-500' : 'hover:bg-white/5'
                    }`}
                  >
                    <img
                      src={icon.webpUrl}
                      alt={icon.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl shadow-lg object-cover"
                    />
                    <span className="text-[10px] text-slate-200 mt-1.5 font-medium text-center truncate max-w-full">
                      {icon.name.split(' ')[0]}
                    </span>
                  </div>
                );
              })}

              {/* Fake filler apps for grid realism */}
              {[
                { name: 'Photos', color: 'from-amber-400 to-rose-500' },
                { name: 'Maps', color: 'from-emerald-400 to-teal-600' },
                { name: 'Wallet', color: 'from-blue-500 to-indigo-600' },
              ].map((app, i) => (
                <div key={i} className="flex flex-col items-center p-2 opacity-50">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.color} shadow-md`} />
                  <span className="text-[10px] text-slate-400 mt-1.5 font-medium">{app.name}</span>
                </div>
              ))}
            </div>

            {/* Bottom Dock */}
            <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-3xl p-3 flex justify-around">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/80" />
              <div className="w-10 h-10 rounded-xl bg-blue-500/80" />
              <div className="w-10 h-10 rounded-xl bg-rose-500/80" />
            </div>

            {/* Home indicator bar */}
            <div className="w-28 h-1 bg-slate-600 rounded-full mx-auto mt-4" />
          </div>

          {/* Active Selected Icon Details Panel */}
          <div className="flex-1 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Selected Icon Details
              </span>
              <span className="inline-flex items-center text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Web-Ready Optimized
              </span>
            </div>

            <h4 className="text-xl font-bold text-white">{activeIcon.name}</h4>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Original JPG</span>
                <span className="text-sm font-bold text-slate-200">{activeIcon.jpgSize}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-rose-400 block font-semibold">Optimized WebP</span>
                <span className="text-sm font-bold text-emerald-400">{activeIcon.webpSize}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">High-Res PNG</span>
                <span className="text-sm font-bold text-slate-200">{activeIcon.pngSize}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Prompt Definition:</label>
              <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 leading-relaxed font-mono">
                {activeIcon.prompt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
