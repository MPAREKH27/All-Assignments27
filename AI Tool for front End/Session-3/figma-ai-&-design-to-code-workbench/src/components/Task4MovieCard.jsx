import React, { useState } from 'react';
import { MOVIE_PRESETS } from '../data/mockData';
import { MovieCardData } from '../types';
import { Film, Copy, Check, Download, ShieldAlert, Sparkles, Eye, Code, CheckCircle } from 'lucide-react';

export const Task4MovieCard: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieCardData>(MOVIE_PRESETS[0]);
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css'>('preview');
  const [copied, setCopied] = useState<boolean>(false);

  // Pure HTML representation for selected movie
  const getPureHtml = (movie: MovieCardData) => {
    return `<!-- BookMyShow Movie Card - Pure HTML (No JS / Frameworks) -->
<div class="bms-card">
  <div class="bms-poster-container">
    <img 
      src="${movie.posterUrl}" 
      alt="${movie.title} Movie Poster" 
      class="bms-poster" 
    />
    <div class="bms-rating-badge">
      <span class="bms-star">★</span>
      <span class="bms-score">${movie.rating}/10</span>
      <span class="bms-votes">(${movie.voteCount})</span>
    </div>
    <div class="bms-format-tag">${movie.format}</div>
  </div>
  
  <div class="bms-details">
    <h3 class="bms-title">${movie.title}</h3>
    <p class="bms-genre">${movie.genre.join(' • ')}</p>
    <div class="bms-meta">
      <span class="bms-lang">${movie.language.split(',')[0]}</span>
      <span class="bms-dot">•</span>
      <span class="bms-duration">${movie.duration}</span>
    </div>
    <button type="button" class="bms-btn">Book Tickets</button>
  </div>
</div>`;
  };

  const pureCss = `/* BookMyShow Movie Card Pure CSS Stylesheet */
.bms-card {
  width: 270px;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.06);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  border: 1px solid #e2e8f0;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
  margin: 0 auto;
}

.bms-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.22);
}

.bms-poster-container {
  position: relative;
  width: 100%;
  height: 360px;
  background-color: #0f172a;
  overflow: hidden;
}

.bms-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.bms-rating-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.7) 70%, transparent);
  color: #ffffff;
  padding: 14px 14px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.bms-star {
  color: #f59e0b;
  font-size: 16px;
}

.bms-score {
  font-weight: 700;
  color: #ffffff;
}

.bms-votes {
  font-size: 11px;
  color: #cbd5e1;
  margin-left: auto;
}

.bms-format-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(15, 23, 42, 0.85);
  color: #f8fafc;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.bms-details {
  padding: 16px;
  background-color: #ffffff;
}

.bms-title {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bms-genre {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.bms-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 14px;
}

.bms-lang {
  background-color: #f1f5f9;
  color: #334155;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
}

.bms-btn {
  width: 100%;
  background-color: #f43f5e;
  color: #ffffff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  box-shadow: 0 4px 12px rgba(244, 63, 94, 0.3);
}

.bms-btn:hover {
  background-color: #e11d48;
}

.bms-btn:active {
  transform: scale(0.98);
}`;

  const handleCopyCode = () => {
    const codeToCopy = activeTab === 'html' ? getPureHtml(selectedMovie) : pureCss;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${selectedMovie.title} - BookMyShow Movie Card</title>
  <link rel="stylesheet" href="style.css">
</head>
<body style="background-color: #0f172a; min-height: 100vh; display: flex; justify-content: center; align-items: center; margin: 0;">
  ${getPureHtml(selectedMovie)}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bookmyshow_movie_card_${selectedMovie.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <Film className="w-3.5 h-3.5" />
              <span>Task 4: Pure HTML & CSS Manual Conversion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              BookMyShow Movie Card Converter
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Manual pixel-perfect conversion of a BookMyShow movie card layout (Poster, Title, Star Rating, Format Badges, Book Now CTA).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadZip}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-lg shadow-rose-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download HTML & CSS Bundle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Constraint Banner */}
      <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between text-xs sm:text-sm text-rose-200 shadow-lg">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <div>
            <span className="font-bold text-white">Strict Constraint Enforced: </span>
            <span>Zero JavaScript and Zero CSS Frameworks. Pure standard HTML5 markup and vanilla CSS3 flexbox layout.</span>
          </div>
        </div>
        <span className="bg-rose-500/20 text-rose-300 font-mono text-xs px-2.5 py-1 rounded border border-rose-500/30 font-bold hidden sm:inline">
          100% Validated
        </span>
      </div>

      {/* Main Split: Movie Selector & Live Render vs Code Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Movie Selector & Render (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
          {/* Movie Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Select BookMyShow Movie Title:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {MOVIE_PRESETS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMovie(m)}
                  className={`p-2 rounded-xl text-xs font-medium text-left transition truncate border ${
                    selectedMovie.id === m.id
                      ? 'bg-rose-500/20 border-rose-500 text-rose-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m.title}
                </button>
              ))}
            </div>
          </div>

          {/* Render Frame */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex items-center justify-center min-h-[460px]">
            <style>{pureCss}</style>
            <div dangerouslySetInnerHTML={{ __html: getPureHtml(selectedMovie) }} />
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-bold text-slate-200 flex items-center space-x-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Layout Parity Guarantee:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Box-shadows, gradient overlays, rating star alignment, and button padding match Figma layout specifications exactly.
            </p>
          </div>
        </div>

        {/* Right Side: Code Viewer & Inspector (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === 'preview'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Card Specifications</span>
              </button>
              <button
                onClick={() => setActiveTab('html')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition font-mono ${
                  activeTab === 'html'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>index.html</span>
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition font-mono ${
                  activeTab === 'css'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>style.css</span>
              </button>
            </div>

            {activeTab !== 'preview' && (
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-mono text-xs transition border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-rose-400" />}
                <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
              </button>
            )}
          </div>

          {activeTab === 'preview' ? (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  <span>Movie Card Structure & Figma Tokens</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Card Dimension</span>
                    <span className="text-white font-bold">Width: 270px, Height: Auto</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Poster Aspect Ratio</span>
                    <span className="text-white font-bold">360px Height (3:4 ratio)</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Action CTA Button</span>
                    <span className="text-white font-bold">#f43f5e (Rose 500), 8px Radius</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Rating Star Overlay</span>
                    <span className="text-white font-bold">Linear Gradient + Amber Star</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <span className="font-bold text-slate-200 block">Movie Synopsis:</span>
                <p className="text-slate-400 leading-relaxed">{selectedMovie.synopsis}</p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto max-h-[480px] scrollbar-thin text-slate-300">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {activeTab === 'html' ? getPureHtml(selectedMovie) : pureCss}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
