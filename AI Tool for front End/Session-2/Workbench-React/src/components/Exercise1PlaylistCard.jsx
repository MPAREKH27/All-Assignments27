import React, { useState } from 'react';
import { Music, Play, Pause, Heart, Disc, CheckCircle2, Terminal, Sparkles, User, ListMusic, Code2, Copy, Check } from 'lucide-react';
import { INITIAL_PLAYLIST } from '../data/sampleData';
import { CodeViewer } from './CodeViewer';

export const Exercise1PlaylistCard: React.FC = () => {
  const [playlist, setPlaylist] = useState(INITIAL_PLAYLIST);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showTracks, setShowTracks] = useState(false);
  const [simulatingCopilot, setSimulatingCopilot] = useState(false);
  const [copilotStep, setCopilotStep] = useState(0);

  const playlistCardJSX = `// PlaylistCard.jsx - Generated with GitHub Copilot
import React from 'react';

/**
 * PlaylistCard Component
 * Displays a music playlist's name, creator, and song count.
 * 
 * @param {Object} props
 * @param {string} props.name - The title of the playlist
 * @param {string} props.creator - Creator or curator username
 * @param {number} props.songCount - Total number of tracks in the playlist
 * @param {string} [props.coverUrl] - Optional URL for the cover thumbnail image
 * @param {function} [props.onPlay] - Optional callback when play button is clicked
 */
export function PlaylistCard({ name, creator, songCount, coverUrl, onPlay }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all p-4 max-w-sm">
      {/* Cover Image Thumbnail */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-slate-800 group">
        <img
          src={coverUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {onPlay && (
          <button 
            onClick={onPlay}
            className="absolute bottom-3 right-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-3 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
            aria-label="Play Playlist"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>

      {/* Playlist Details */}
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-100 truncate" title={name}>
          {name}
        </h3>
        <p className="text-sm text-slate-400 flex items-center gap-1.5">
          <span>By</span>
          <span className="text-slate-200 font-medium hover:underline cursor-pointer">
            {creator}
          </span>
        </p>
        <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 mt-3">
          <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-medium">
            {songCount} {songCount === 1 ? 'Song' : 'Songs'}
          </span>
          <span className="text-cyan-400 font-semibold">Public Playlist</span>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCard;`;

  const playlistCardJS = `// PlaylistCard.js - Standard JavaScript with PropTypes
import React from 'react';
import PropTypes from 'prop-types';

/**
 * PlaylistCard Component (JavaScript / ES6)
 */
export function PlaylistCard({ name, creator, songCount, coverUrl, onPlay }) {
  return (
    <div className="playlist-card" style={{
      backgroundColor: '#0f172a',
      border: '1px solid #1e293b',
      borderRadius: '1rem',
      padding: '1rem',
      maxWidth: '320px',
      color: '#f8fafc',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <img
          src={coverUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4'}
          alt={name}
          style={{ width: '100%', borderRadius: '0.75rem', aspectRatio: '1/1', objectFit: 'cover' }}
        />
      </div>
      <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.125rem', fontWeight: 'bold' }}>{name}</h3>
      <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.875rem' }}>Created by {creator}</p>
      <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#38bdf8' }}>
        {songCount} Tracks
      </div>
    </div>
  );
}

PlaylistCard.propTypes = {
  name: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  songCount: PropTypes.number.isRequired,
  coverUrl: PropTypes.string,
  onPlay: PropTypes.func
};

PlaylistCard.defaultProps = {
  coverUrl: '',
  onPlay: () => {}
};

export default PlaylistCard;`;

  const playlistCardTSX = `// PlaylistCard.tsx - TypeScript Version
import React from 'react';

export interface PlaylistCardProps {
  name: string;
  creator: string;
  songCount: number;
  coverUrl?: string;
  onPlay?: () => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  name,
  creator,
  songCount,
  coverUrl,
  onPlay
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 max-w-sm text-slate-100">
      {coverUrl && (
        <img src={coverUrl} alt={name} className="w-full aspect-square object-cover rounded-xl mb-3" />
      )}
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm text-slate-400">Curated by {creator}</p>
      <p className="text-xs text-cyan-400 mt-2 font-medium">{songCount} songs</p>
    </div>
  );
};`;

  const triggerCopilotSimulation = () => {
    setSimulatingCopilot(true);
    setCopilotStep(1);
    setTimeout(() => setCopilotStep(2), 1200);
    setTimeout(() => setCopilotStep(3), 2500);
    setTimeout(() => setCopilotStep(4), 3800);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Exercise Overview Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Music className="w-3.5 h-3.5" />
              Task 1 of 5
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              GitHub Copilot PlaylistCard Component
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Install GitHub Copilot extension in VS Code and use AI auto-suggestions to generate a functional React component called <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">PlaylistCard</code> that displays a playlist's <strong>name</strong>, <strong>creator</strong>, and <strong>song count</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Component Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Play className="w-4 h-4 text-cyan-400 fill-current" />
                Live PlaylistCard Component
              </h3>
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-medium">
                Live Interactive Render
              </span>
            </div>

            {/* Rendered Component */}
            <div className="flex justify-center p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl relative transition-all hover:border-slate-700">
                
                {/* Playlist Cover */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-slate-800 group shadow-md">
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-2 left-2 text-[10px] font-semibold bg-slate-900/80 backdrop-blur-md text-cyan-300 px-2 py-0.5 rounded-md border border-slate-700">
                    {playlist.genre}
                  </span>

                  {/* Play Action */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute bottom-3 right-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 p-3 rounded-full shadow-xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center"
                    aria-label="Play Playlist"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={() => {
                      setLiked(!liked);
                      setPlaylist(prev => ({
                        ...prev,
                        likes: liked ? prev.likes - 1 : prev.likes + 1
                      }));
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition ${
                      liked ? 'bg-rose-500/80 text-white' : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900/80'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Info Section */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-100 truncate" title={playlist.name}>
                    {playlist.name}
                  </h3>
                  
                  <p className="text-sm text-slate-400 flex items-center gap-1">
                    <span>Curated by</span>
                    <span className="text-slate-200 font-semibold hover:text-cyan-400 cursor-pointer transition">
                      {playlist.creator}
                    </span>
                  </p>

                  <div className="pt-3 flex items-center justify-between border-t border-slate-800/80 mt-3 text-xs">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                      <Disc className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
                      <span>{playlist.songCount} Songs</span>
                    </div>

                    <button
                      onClick={() => setShowTracks(!showTracks)}
                      className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[11px] underline"
                    >
                      <ListMusic className="w-3.5 h-3.5" />
                      {showTracks ? 'Hide Tracks' : 'View Tracks'}
                    </button>
                  </div>
                </div>

                {/* Optional Song List Drawer */}
                {showTracks && (
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs bg-slate-950/80 p-3 rounded-xl">
                    <p className="text-slate-400 font-medium mb-1 flex justify-between">
                      <span>Sample Track List</span>
                      <span className="text-slate-500">{playlist.songs.length} shown</span>
                    </p>
                    {playlist.songs.map((song, i) => (
                      <div key={song.id} className="flex items-center justify-between text-slate-300 p-1.5 rounded hover:bg-slate-800/60">
                        <span className="truncate max-w-[170px]">{i + 1}. {song.title}</span>
                        <span className="text-slate-500 text-[10px]">{song.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Controls Props Editor */}
            <div className="mt-5 space-y-3 pt-4 border-t border-slate-800 text-xs">
              <span className="font-semibold text-slate-300 block mb-1">
                ⚙️ Live Props Controls
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Playlist Name</label>
                  <input
                    type="text"
                    value={playlist.name}
                    onChange={e => setPlaylist({ ...playlist, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Creator Name</label>
                  <input
                    type="text"
                    value={playlist.creator}
                    onChange={e => setPlaylist({ ...playlist, creator: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Song Count ({playlist.songCount})</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={playlist.songCount}
                  onChange={e => setPlaylist({ ...playlist, songCount: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Copilot Setup Guide & Copilot Ghost Text Simulator */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step-by-Step Instructions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-indigo-400" />
              How to Install & Use GitHub Copilot in VS Code
            </h3>

            <ol className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-3 items-start bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="text-slate-100 block">Install Extensions in VS Code:</strong>
                  Open VS Code, press <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">Ctrl+Shift+X</code> (or <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">Cmd+Shift+X</code> on Mac), search for <strong>"GitHub Copilot"</strong>, and click <strong>Install</strong>.
                </div>
              </li>

              <li className="flex gap-3 items-start bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="text-slate-100 block">Sign In to GitHub:</strong>
                  Click the notification at the bottom left status bar to sign in with your GitHub account having an active Copilot subscription.
                </div>
              </li>

              <li className="flex gap-3 items-start bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="text-slate-100 block">Prompt with Comments or Function Name:</strong>
                  Create <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">PlaylistCard.jsx</code> and type a descriptive JS comment or start writing the function head:
                  <div className="mt-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-indigo-300">
                    // Write a React functional component called PlaylistCard that displays playlist name, creator, and song count
                  </div>
                </div>
              </li>

              <li className="flex gap-3 items-start bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">4</span>
                <div>
                  <strong className="text-slate-100 block">Accept Ghost Text:</strong>
                  As you type, Copilot displays gray ghost text suggestions. Press <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-bold">Tab</code> to accept the suggestion or <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-bold">Alt + ]</code> to see next alternatives!
                </div>
              </li>
            </ol>
          </div>

          {/* Interactive VS Code Copilot Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Interactive VS Code Copilot Ghost Text Simulator
              </h3>
              <button
                onClick={triggerCopilotSimulation}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Simulate Copilot Typing
              </button>
            </div>

            {/* VS Code Mock Editor Window */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed text-slate-300 min-h-[180px] shadow-inner relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-[11px] text-slate-500 font-sans">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 text-slate-300 font-mono">PlaylistCard.jsx</span>
                </span>
                <span className="text-indigo-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> GitHub Copilot Active
                </span>
              </div>

              {copilotStep === 0 && (
                <div className="text-slate-500 italic py-6 text-center font-sans">
                  Click <strong>"Simulate Copilot Typing"</strong> above to test how GitHub Copilot auto-suggests the <code className="text-cyan-400">PlaylistCard</code> code inside VS Code!
                </div>
              )}

              {copilotStep >= 1 && (
                <div>
                  <span className="text-slate-500">// React functional component called PlaylistCard</span>
                  <br />
                  <span className="text-cyan-400">export function</span> <span className="text-amber-300">PlaylistCard</span>({'{'} name, creator, songCount {'}'}) {'{'}
                </div>
              )}

              {copilotStep >= 2 && (
                <div className="pl-4 text-slate-400 italic bg-slate-900/50 p-2 rounded my-1 border-l-2 border-indigo-500 animate-pulse">
                  <span className="text-slate-500">// GitHub Copilot ghost text suggestion... (Press TAB to accept)</span>
                  <br />
                  <span className="text-slate-500">
                    {'  return (\n    <div className="playlist-card">\n      <h3>{name}</h3>\n      <p>By {creator}</p>\n      <span>{songCount} Songs</span>\n    </div>\n  );'}
                  </span>
                </div>
              )}

              {copilotStep >= 3 && (
                <div className="text-emerald-400 font-semibold py-1 text-xs font-sans flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Pressed [TAB]! Copilot suggestion inserted successfully!</span>
                </div>
              )}

              {copilotStep >= 4 && (
                <div className="mt-2 text-slate-200 pl-4 border-l-2 border-emerald-500 bg-slate-900/80 p-2 rounded">
                  <span className="text-cyan-400">return</span> (
                  <br />
                  {'  '}&lt;<span className="text-rose-400">div</span> <span className="text-amber-300">className</span>=<span className="text-emerald-300">"playlist-card"</span>&gt;
                  <br />
                  {'    '}&lt;<span className="text-rose-400">h3</span>&gt;{'{'}name{'}'}&lt;/<span className="text-rose-400">h3</span>&gt;
                  <br />
                  {'    '}&lt;<span className="text-rose-400">p</span>&gt;By {'{'}creator{'}'}&lt;/<span className="text-rose-400">p</span>&gt;
                  <br />
                  {'    '}&lt;<span className="text-rose-400">span</span>&gt;{'{'}songCount{'}'} Songs&lt;/<span className="text-rose-400">span</span>&gt;
                  <br />
                  {'  '}&lt;/<span className="text-rose-400">div</span>&gt;
                  <br />
                  );
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Generated Code Viewers (JSX, JS, TSX) */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          Task 1 Full Code Files (JSX & JS)
        </h3>
        <CodeViewer
          filename="PlaylistCard.jsx"
          jsxCode={playlistCardJSX}
          jsCode={playlistCardJS}
          tsxCode={playlistCardTSX}
          description="Complete React PlaylistCard component solution"
        />
      </div>
    </div>
  );
};
