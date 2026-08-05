import React, { useState, useEffect, useCallback } from 'react';
import { Video, Search, Play, X, Sparkles, Terminal, CheckCircle2, Code2, Clock, Eye, RefreshCw } from 'lucide-react';
import { YOUTUBE_VIDEOS } from '../data/sampleData';
import { YouTubeVideo } from '../types';
import { CodeViewer } from './CodeViewer';

/**
 * Custom Hook: useVideos
 * Encapsulates data fetching, search filter, loading, and error states for YouTube videos
 */
export function useVideos(defaultSearch = '') {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(defaultSearch);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setVideos(YOUTUBE_VIDEOS);
    } catch (err) {
      setError('Failed to fetch YouTube video list.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.channelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    videos: filteredVideos,
    rawCount: videos.length,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refetch: fetchVideos
  };
}

export const Exercise4YouTubeList: React.FC = () => {
  const { videos, loading, error, searchTerm, setSearchTerm, refetch } = useVideos();
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [simStep, setSimStep] = useState(0);

  const useVideosCodeJSX = `// useVideos.js - Refactored Custom Hook (Auto-generated via GitHub Copilot)
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to fetch YouTube video titles and metadata.
 * Copilot auto-suggested state handling, AbortController, and search filter.
 * 
 * @param {string} initialQuery 
 * @returns {Object} { videos, loading, error, searchTerm, setSearchTerm, refetch }
 */
export function useVideos(initialQuery = '') {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    try {
      // Simulated fetch or real YouTube Data API v3 endpoint
      const res = await fetch('/api/youtube/search', { signal: controller.signal });
      if (!res.ok) throw new Error('YouTube API request failed');
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Error fetching videos');
      }
    } fontally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Derived video filter based on search input
  const filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.channelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    videos: filteredVideos,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refetch: fetchVideos
  };
}

export default useVideos;`;

  const videoListJSX = `// YouTubeVideoList.jsx - Refactored Component
import React, { useState } from 'react';
import { useVideos } from './useVideos';

export function YouTubeVideoList() {
  const { videos, loading, error, searchTerm, setSearchTerm, refetch } = useVideos();
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="youtube-feed p-4">
      {/* Search Header */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search YouTube videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2.5 bg-slate-800 text-white rounded-lg border border-slate-700"
        />
      </div>

      {loading && <p className="text-slate-400">Loading videos...</p>}
      {error && <p className="text-rose-400">{error}</p>}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="cursor-pointer bg-slate-900 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                {video.duration}
              </span>
            </div>
            <h4 className="font-semibold text-slate-100 text-sm line-clamp-2">{video.title}</h4>
            <p className="text-xs text-slate-400 mt-1">{video.channelName} • {video.views}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeVideoList;`;

  const runCopilotSimulation = () => {
    setSimStep(1);
    setTimeout(() => setSimStep(2), 1000);
    setTimeout(() => setSimStep(3), 2200);
    setTimeout(() => setSimStep(4), 3400);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Video className="w-3.5 h-3.5" />
              Task 4 of 5
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              YouTube Video List & Copilot `useVideos` Refactoring
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Use GitHub Copilot auto-suggestions to refactor a React component that shows a list of YouTube video titles, extracting data-fetching logic into a separate <code className="text-red-300 bg-slate-800 px-1.5 py-0.5 rounded">useVideos</code> hook.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live YouTube Video Feed & Player */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-slate-100">
                  Live YouTube Feed (Powered by `useVideos`)
                </h3>
              </div>

              <button
                onClick={refetch}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-400' : ''}`} />
                Reload Videos
              </button>
            </div>

            {/* Search input */}
            <div className="relative mb-5">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search YouTube videos or channels..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-red-500 transition"
              />
            </div>

            {/* Video Cards Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-slate-950 border border-slate-800 rounded-xl p-3 animate-pulse space-y-2">
                    <div className="aspect-video bg-slate-800 rounded-lg" />
                    <div className="h-4 bg-slate-800 rounded w-5/6" />
                    <div className="h-3 bg-slate-800 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : videos.length === 0 ? (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
                No videos found matching "{searchTerm}"
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className="group bg-slate-950 border border-slate-800/80 rounded-2xl p-3 shadow-lg hover:border-red-500/50 transition cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail */}
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-2.5 bg-slate-900">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition" />
                        
                        {/* Play Icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <span className="absolute bottom-2 right-2 bg-slate-950/90 backdrop-blur-md text-slate-200 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-slate-700">
                          {video.duration}
                        </span>
                      </div>

                      {/* Details */}
                      <h4 className="font-bold text-xs text-slate-100 line-clamp-2 group-hover:text-red-400 transition leading-snug">
                        {video.title}
                      </h4>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-medium text-slate-300 truncate max-w-[130px]">
                        {video.channelName}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {video.views} • {video.uploadedAgo}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Video Playback Modal */}
            {activeVideo && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-4 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-sm text-slate-100 truncate pr-4">
                      {activeVideo.title}
                    </h3>
                    <button
                      onClick={() => setActiveVideo(null)}
                      className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Embedded Player */}
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="text-slate-200 font-semibold">{activeVideo.channelName}</span>
                    <span>{activeVideo.views} • {activeVideo.uploadedAgo}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Copilot Refactoring Demonstration */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Copilot Auto-Suggestion Refactoring Simulator
              </h3>
              <button
                onClick={runCopilotSimulation}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow"
              >
                Simulate Copilot
              </button>
            </div>

            {/* VS Code Ghost Simulation Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs leading-relaxed min-h-[220px]">
              <div className="text-slate-500 text-[11px] mb-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>VS Code Editor - useVideos.js</span>
              </div>

              {simStep === 0 && (
                <p className="text-slate-500 italic py-8 text-center font-sans">
                  Click <strong>"Simulate Copilot"</strong> to see GitHub Copilot complete the custom hook code as you type <code className="text-red-400 font-mono">useVideos</code>.
                </p>
              )}

              {simStep >= 1 && (
                <div>
                  <span className="text-slate-500">// Refactoring YouTube feed logic into custom hook</span>
                  <br />
                  <span className="text-cyan-400">export function</span> <span className="text-amber-300">useVideos</span>(initialQuery = '') {'{'}
                </div>
              )}

              {simStep >= 2 && (
                <div className="pl-4 my-2 p-2 bg-slate-900/60 rounded border-l-2 border-red-500 text-slate-400 animate-pulse italic">
                  <span className="text-slate-500">// Copilot suggestion (Press TAB to accept)</span>
                  <br />
                  <span className="text-slate-500">
                    {'  const [videos, setVideos] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  const [searchTerm, setSearchTerm] = useState(initialQuery);'}
                  </span>
                </div>
              )}

              {simStep >= 3 && (
                <div className="pl-4 my-2 text-emerald-400 font-bold font-sans flex items-center gap-1 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Pressed [TAB]! Copilot generated state & useEffect auto-fetch!</span>
                </div>
              )}

              {simStep >= 4 && (
                <div className="pl-4 text-slate-200 space-y-1">
                  <div>
                    <span className="text-cyan-400">return</span> {'{'} videos, loading, error, searchTerm, setSearchTerm {'}'};
                  </div>
                  <div className="text-slate-500">{'}'}</div>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <strong className="text-red-400 block font-sans">💡 Copilot Refactoring Strategy:</strong>
              <p className="text-slate-400">
                Moving data fetching logic into <code className="text-red-300">useVideos</code> eliminates duplicate state logic and makes the UI component purely declarative.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Code Viewers */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-red-400" />
          Task 4 Full Code Files (`useVideos.js` & `YouTubeVideoList.jsx`)
        </h3>
        <CodeViewer
          filename="useVideos.js"
          jsxCode={useVideosCodeJSX}
          jsCode={useVideosCodeJSX}
          description="Custom React Hook for YouTube Video Data Fetching"
        />
        <CodeViewer
          filename="YouTubeVideoList.jsx"
          jsxCode={videoListJSX}
          jsCode={videoListJSX}
          description="YouTube Video List React Component"
        />
      </div>
    </div>
  );
};
