import React, { useState } from 'react';
import { ProjectFile } from '../types';
import { Folder, FileText, Code2, Terminal, Copy, Check, Play, FileCode, CheckCircle2 } from 'lucide-react';

interface FileExplorerProps {
  files: ProjectFile[];
  spotifyKey: string;
  onLogKeyToConsole: () => void;
  onRunZomatoApi: () => void;
  consoleLogs: string[];
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  spotifyKey,
  onLogKeyToConsole,
  onRunZomatoApi,
  consoleLogs
}) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('src/pages/index.js');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  // Helper to find file recursively
  const findFile = (fileList: ProjectFile[], targetPath: string): ProjectFile | null => {
    for (const f of fileList) {
      if (f.path === targetPath) return f;
      if (f.children) {
        const found = findFile(f.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };

  const activeFile = findFile(files, selectedFilePath);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedPath(selectedFilePath);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const renderTree = (items: ProjectFile[], depth = 0) => {
    return items.map((item) => {
      const isFolder = item.type === 'folder';
      const isSelected = item.path === selectedFilePath;

      return (
        <div key={item.path} style={{ paddingLeft: `${depth * 12}px` }}>
          <div
            onClick={() => {
              if (!isFolder) setSelectedFilePath(item.path);
            }}
            className={`flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition ${
              isSelected
                ? 'bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            {isFolder ? (
              <Folder className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : item.name.endsWith('.js') || item.name.endsWith('.ts') ? (
              <FileCode className="w-4 h-4 text-sky-400 shrink-0" />
            ) : (
              <FileText className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span className="truncate">{item.name}</span>
            {item.name === '.env.local' && (
              <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded border border-amber-500/30 ml-auto">
                Env
              </span>
            )}
            {item.name === 'ai_env_example.txt' && (
              <span className="text-[9px] bg-purple-500/20 text-purple-400 px-1.5 py-0.2 rounded border border-purple-500/30 ml-auto">
                Prompt
              </span>
            )}
          </div>

          {isFolder && item.children && (
            <div className="mt-0.5">{renderTree(item.children, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-6 pb-28">
      
      {/* Intro Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <span>Next.js App Scalable Folder Architecture</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Requirements 2 & 3: Organized <code className="text-emerald-300 font-mono">src</code> directory with{' '}
          <code className="text-sky-300 font-mono">components</code>, <code className="text-sky-300 font-mono">pages</code>, and{' '}
          <code className="text-sky-300 font-mono">utils</code> folders, plus <code className="text-amber-300 font-mono">.env.local</code> variable setup and logging.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Folder Tree */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Folder className="w-4 h-4 text-emerald-400" />
              <span>Project Files</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">spotify-playlist-viewer/</span>
          </div>

          <div className="space-y-1 overflow-y-auto max-h-96 pr-1">
            {renderTree(files)}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <p className="text-[11px] font-semibold text-slate-400">Quick Actions:</p>
            <button
              onClick={onLogKeyToConsole}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs font-medium transition"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Run pages/index.js Log</span>
            </button>
            <button
              onClick={onRunZomatoApi}
              className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-medium transition"
            >
              <Play className="w-3.5 h-3.5 text-sky-400" />
              <span>Run utils/api.js Function</span>
            </button>
          </div>
        </div>

        {/* Right: File Viewer */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          
          {/* Header */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-emerald-400">{selectedFilePath}</span>
            </div>

            {activeFile?.content && (
              <button
                onClick={() => handleCopy(activeFile.content || '')}
                className="flex items-center space-x-1.5 text-slate-400 hover:text-white bg-slate-900 px-2.5 py-1 rounded-lg text-xs border border-slate-800 transition"
              >
                {copiedPath === selectedFilePath ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Description bar */}
          {activeFile?.description && (
            <div className="bg-slate-950/50 px-4 py-2 border-b border-slate-800/60 text-xs text-slate-400">
              💡 {activeFile.description}
            </div>
          )}

          {/* Code Content */}
          <div className="p-4 bg-slate-950/80 font-mono text-xs overflow-x-auto min-h-[300px] text-slate-200 leading-relaxed">
            <pre><code>{activeFile?.content || '// Select a file from the tree on the left to inspect code.'}</code></pre>
          </div>

        </div>

      </div>

      {/* Terminal Output Viewer */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="text-xs font-mono text-slate-400 font-bold ml-2">Console Output Terminal</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Process Active</span>
          </span>
        </div>

        <div className="p-4 font-mono text-xs text-slate-300 space-y-1.5 max-h-48 overflow-y-auto">
          {consoleLogs.map((log, index) => (
            <div key={index} className="flex items-start space-x-2 leading-relaxed">
              <span className="text-emerald-500 font-bold">$</span>
              <span className={log.includes('ZOMATO') ? 'text-amber-300' : log.includes('Spotify') ? 'text-emerald-300' : 'text-slate-200'}>
                {log}
              </span>
            </div>
          ))}
          {consoleLogs.length === 0 && (
            <div className="text-slate-600 italic">No console logs yet. Click "Run pages/index.js Log" or "Run utils/api.js Function" above.</div>
          )}
        </div>
      </div>

    </div>
  );
};
