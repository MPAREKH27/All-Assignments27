import React, { useState } from 'react';
import { INITIAL_WIREFRAME_SECTIONS } from '../data/mockData';
import { WireframeSection } from '../types';
import musicWireframeImg from '../assets/images/music_wireframe_1785924055313.jpg';
import { Wand2, Download, Upload, Check, Eye, Grid, Layers, Play, Search, Heart, Music2, Sliders, RefreshCw, FileImage } from 'lucide-react';

interface Task1Props {
  onUploadSuccess: (filename: string) => void;
}

export const Task1MusicWireframe: React.FC<Task1Props> = ({ onUploadSuccess }) => {
  const [promptText, setPromptText] = useState<string>(
    "Create a modern, clean wireframe for a 'Music Playlist Manager' app homepage with sidebar navigation, search bar, active player bar at bottom, trending playlists grid, and track listing table."
  );
  const [sections, setSections] = useState<WireframeSection[]>(INITIAL_WIREFRAME_SECTIONS);
  const [showFigmaGrid, setShowFigmaGrid] = useState<boolean>(true);
  const [showMeasurements, setShowMeasurements] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(true);
  const [uploadLog, setUploadLog] = useState<string>('Uploaded artifact: music_playlist_wireframe_v1.png to /assignment_folder/');

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setUploadLog('Regenerated wireframe blueprint based on updated prompt parameters.');
    }, 1200);
  };

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  };

  const handleExportImage = () => {
    const link = document.createElement('a');
    link.href = musicWireframeImg;
    link.download = 'music_playlist_wireframe_figma_ai.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadFolder = () => {
    setIsUploaded(true);
    const filename = `music_playlist_wireframe_${Date.now().toString().slice(-4)}.png`;
    setUploadLog(`Successfully exported & uploaded '${filename}' to Assignment Folder.`);
    onUploadSuccess(filename);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <Wand2 className="w-3.5 h-3.5" />
              <span>Task 1: Figma AI Prompt-to-Wireframe</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Music Playlist Manager Wireframe Generator
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Use Figma AI prompt execution to construct a high-fidelity monochromatic blueprint for a Music Playlist Manager app homepage, inspect component constraints, export wireframe artifacts, and sync to assignment repository.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportImage}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition"
            >
              <Download className="w-4 h-4 text-rose-400" />
              <span>Export Wireframe</span>
            </button>
            <button
              onClick={handleUploadFolder}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-md ${
                isUploaded
                  ? 'bg-emerald-600/90 text-white hover:bg-emerald-500'
                  : 'bg-rose-600 text-white hover:bg-rose-500'
              }`}
            >
              {isUploaded ? <Check className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
              <span>{isUploaded ? 'Uploaded to Folder' : 'Upload Artifact'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prompt Control & Layer Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* AI Text Prompt Input */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Wand2 className="w-4 h-4 text-rose-400" />
                <span>Figma AI Text Prompt</span>
              </label>
              <span className="text-[10px] text-slate-500 font-mono">Figma AI v3.2</span>
            </div>

            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-rose-500 font-sans resize-none"
              placeholder="Describe the wireframe layout..."
            />

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition shadow-lg shadow-rose-500/20 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Wireframe via Figma AI...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Re-Generate Figma Wireframe</span>
                </>
              )}
            </button>
          </div>

          {/* Wireframe Structural Components & Visibility Toggle */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Auto-Layout Layers</span>
              </h3>
              <span className="text-xs text-slate-500">{sections.filter((s) => s.visible).length} / {sections.length} Active</span>
            </div>

            <div className="space-y-2">
              {sections.map((sec) => (
                <div
                  key={sec.id}
                  onClick={() => toggleSection(sec.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                    sec.visible
                      ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      checked={sec.visible}
                      onChange={() => {}}
                      className="rounded bg-slate-900 border-slate-700 text-rose-500 focus:ring-0"
                    />
                    <div>
                      <span className="font-semibold block text-slate-200">{sec.name}</span>
                      <span className="text-[11px] text-slate-400 block font-mono">{sec.description}</span>
                    </div>
                  </div>
                  <Eye className={`w-3.5 h-3.5 ${sec.visible ? 'text-rose-400' : 'text-slate-600'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Figma Canvas Display Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Canvas Inspector Overlays</span>
            </h3>

            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-300 flex items-center space-x-2">
                <Grid className="w-3.5 h-3.5 text-slate-400" />
                <span>Figma Layout Grid (8px)</span>
              </span>
              <button
                onClick={() => setShowFigmaGrid(!showFigmaGrid)}
                className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                  showFigmaGrid ? 'bg-rose-600 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-3.5 h-3.5 bg-white rounded-full shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-300 flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>Component Measurement Specs</span>
              </span>
              <button
                onClick={() => setShowMeasurements(!showMeasurements)}
                className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                  showMeasurements ? 'bg-rose-600 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-3.5 h-3.5 bg-white rounded-full shadow-md" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Canvas Preview Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
            {/* Canvas Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center space-x-2 font-mono text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-white font-semibold">Frame: Homepage Wireframe</span>
                <span>(1440 × 900 px)</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700">
                  Figma Monochromatic Blueprint
                </span>
              </div>
            </div>

            {/* Wireframe Rendering Viewport */}
            <div className="relative bg-slate-950 rounded-xl border border-slate-800 overflow-hidden min-h-[500px] flex flex-col justify-between">
              {/* Optional Grid Overlay */}
              {showFigmaGrid && (
                <div
                  className="absolute inset-0 pointer-events-none z-10 opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(#f43f5e 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />
              )}

              {/* Wireframe Top Header Bar */}
              {sections.find((s) => s.id === 'header')?.visible && (
                <div className="p-4 border-b border-slate-800/80 bg-slate-900/90 flex items-center justify-between relative z-20">
                  <div className="flex items-center space-x-3 w-1/2">
                    <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-400 w-full">
                      <Search className="w-3.5 h-3.5 text-slate-500" />
                      <span>Search tracks, artists, playlists...</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-300 px-2 py-1 rounded">
                      Wireframe User
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">
                      U
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content Split (Sidebar + Center Content) */}
              <div className="flex flex-1 relative z-20">
                {/* Sidebar Wireframe */}
                {sections.find((s) => s.id === 'sidebar')?.visible && (
                  <div className="w-52 border-r border-slate-800/80 bg-slate-900/50 p-4 space-y-4 hidden sm:block">
                    <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm pb-2 border-b border-slate-800">
                      <Music2 className="w-4 h-4" />
                      <span>SoundVault</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-slate-300 font-semibold px-2 py-1 bg-slate-800/80 rounded flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span>Discover Home</span>
                      </div>
                      <div className="text-slate-400 px-2 py-1 hover:text-slate-200 cursor-pointer">Your Playlists</div>
                      <div className="text-slate-400 px-2 py-1 hover:text-slate-200 cursor-pointer">Favorites</div>
                      <div className="text-slate-400 px-2 py-1 hover:text-slate-200 cursor-pointer">Recently Played</div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
                      <div className="font-bold uppercase text-[10px] text-slate-400">Custom Playlists</div>
                      <div className="truncate text-slate-400"> Chill Lofi Beats 2026</div>
                      <div className="truncate text-slate-400"> Coding Deep Focus</div>
                      <div className="truncate text-slate-400"> Synthwave Roadtrip</div>
                    </div>
                  </div>
                )}

                {/* Main Content Area */}
                <div className="flex-1 p-5 space-y-5 overflow-y-auto max-h-[460px] scrollbar-thin">
                  {/* Hero Banner Wireframe */}
                  {sections.find((s) => s.id === 'banner')?.visible && (
                    <div className="relative rounded-xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-5 overflow-hidden">
                      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className="w-28 h-28 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-slate-500">
                          <FileImage className="w-8 h-8 text-slate-600" />
                        </div>
                        <div className="space-y-1.5 text-center sm:text-left">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                            Figma AI Auto-Generated Hero
                          </span>
                          <h2 className="text-lg font-bold text-white">Curated Coding Moods #04</h2>
                          <p className="text-xs text-slate-400">42 Tracks • 2 hrs 18 mins • Curated by AI Studio Engine</p>
                          <div className="flex items-center space-x-2 pt-2 justify-center sm:justify-start">
                            <button className="bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5">
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Play All</span>
                            </button>
                            <button className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                              <Heart className="w-3.5 h-3.5 inline mr-1" /> Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generated Image Reference Backdrop */}
                  <div className="relative rounded-xl border border-slate-800 overflow-hidden bg-slate-900">
                    <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300 flex items-center space-x-2">
                        <FileImage className="w-4 h-4 text-rose-400" />
                        <span>Figma AI Export Visual Blueprint</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Rendered Export Spec</span>
                    </div>
                    <img
                      src={musicWireframeImg}
                      alt="Music Playlist Manager Figma AI Wireframe"
                      className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Measurement Annotations */}
                  {showMeasurements && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs space-y-2 font-mono">
                      <div className="text-slate-400 font-bold flex items-center justify-between border-b border-slate-800 pb-1">
                        <span>Figma Layout Inspector & Padding Rules</span>
                        <span className="text-emerald-400">Auto-Layout Active</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
                        <div className="bg-slate-950 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 block">Frame Width:</span>
                          <span className="text-white font-bold">1440px (Responsive)</span>
                        </div>
                        <div className="bg-slate-950 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 block">Container Gap:</span>
                          <span className="text-white font-bold">24px Grid Spacing</span>
                        </div>
                        <div className="bg-slate-950 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 block">Inner Padding:</span>
                          <span className="text-white font-bold">20px Vertical / Horiz</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Player Bar Wireframe */}
              {sections.find((s) => s.id === 'player')?.visible && (
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between relative z-20 text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                      <Music2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Ambient Echoes</div>
                      <div className="text-[11px] text-slate-400">Lofi Dreamer</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-1 w-1/3">
                    <div className="flex items-center space-x-3 text-slate-300">
                      <Play className="w-4 h-4 text-rose-400 cursor-pointer fill-current" />
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full w-2/5" />
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono hidden sm:block">
                    1:24 / 3:45
                  </div>
                </div>
              )}
            </div>

            {/* Status Log Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 flex items-center justify-between">
              <span className="text-emerald-400 flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{uploadLog}</span>
              </span>
              <span className="text-slate-500 text-[11px]">Ready for Grading</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
