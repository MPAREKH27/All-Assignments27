import React, { useState } from 'react';
import { Check, Copy, Download, FileCode, Sparkles } from 'lucide-react';
import { CodeFormat } from '../types';

interface CodeViewerProps {
  filename: string;
  jsxCode: string;
  jsCode: string;
  tsxCode?: string;
  description?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  filename,
  jsxCode,
  jsCode,
  tsxCode,
  description
}) => {
  const [activeFormat, setActiveFormat] = useState<CodeFormat>('jsx');
  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    if (activeFormat === 'js') return jsCode;
    if (activeFormat === 'tsx' && tsxCode) return tsxCode;
    return jsxCode;
  };

  const getExtension = () => {
    if (activeFormat === 'js') return '.js';
    if (activeFormat === 'tsx') return '.tsx';
    return '.jsx';
  };

  const currentFilename = filename.replace(/\.(jsx|js|tsx)$/, '') + getExtension();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getActiveCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([getActiveCode()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = currentFilename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const codeLines = getActiveCode().trim().split('\n');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl text-slate-200 text-sm font-mono my-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-100">{currentFilename}</span>
          {description && (
            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-sans">
              {description}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Format Selector */}
          <div className="flex bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60 text-xs font-sans">
            <button
              onClick={() => setActiveFormat('jsx')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                activeFormat === 'jsx'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              JSX
            </button>
            <button
              onClick={() => setActiveFormat('js')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                activeFormat === 'js'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              JS (ES6)
            </button>
            {tsxCode && (
              <button
                onClick={() => setActiveFormat('tsx')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  activeFormat === 'tsx'
                    ? 'bg-blue-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                TSX
              </button>
            )}
          </div>

          {/* Action buttons */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-sans font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-sans">Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Download code file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto p-4 max-h-[500px] overflow-y-auto font-mono text-xs leading-relaxed bg-slate-950 text-slate-300">
        <table className="w-full border-collapse">
          <tbody>
            {codeLines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                <td className="select-none text-right pr-4 text-slate-600 font-mono w-8 text-xs">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-slate-200">
                  {formatSyntaxHighlight(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Basic syntax highlight formatter helper for previewing code
 */
function formatSyntaxHighlight(line: string) {
  if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }
  
  if (line.includes('import ') || line.includes('export ') || line.includes('return ') || line.includes('function ') || line.includes('const ') || line.includes('let ') || line.includes('if ')) {
    return (
      <span>
        {line.split(/(\b(?:import|export|default|function|const|let|var|return|if|else|from|type|interface|typeof)\b)/g).map((part, i) => {
          if (['import', 'export', 'default', 'function', 'const', 'let', 'var', 'return', 'if', 'else', 'from', 'type', 'interface', 'typeof'].includes(part)) {
            return <span key={i} className="text-cyan-400 font-semibold">{part}</span>;
          }
          if (part.includes('useState') || part.includes('useEffect') || part.includes('useVideos') || part.includes('useRestaurants')) {
            return <span key={i} className="text-amber-300">{part}</span>;
          }
          return part;
        })}
      </span>
    );
  }

  return <span>{line}</span>;
}
