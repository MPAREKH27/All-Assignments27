import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState, subscribeToActionLogs, ActionLogEntry } from '../redux/store';
import {
  Activity,
  Layers,
  Camera,
  Copy,
  Download,
  Check,
  Code2,
  Cpu,
  Maximize2,
  Minimize2,
  Trash2,
  Terminal,
  ExternalLink,
} from 'lucide-react';

interface DevToolsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevToolsPanel: React.FC<DevToolsPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const currentState = useSelector((state: RootState) => state);
  const [logs, setLogs] = useState<ActionLogEntry[]>([]);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'actions' | 'state' | 'diff' | 'screenshot'>('actions');
  const [copied, setCopied] = useState(false);
  const [screenshotGenerated, setScreenshotGenerated] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const screenshotRef = useRef<HTMLDivElement>(null);

  // Subscribe to store actions
  useEffect(() => {
    const unsubscribe = subscribeToActionLogs((entry) => {
      setLogs((prev) => [entry, ...prev].slice(0, 50)); // keep last 50
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const selectedLog = logs.find((l) => l.id === selectedLogId) || logs[0];

  const handleCopyJSON = () => {
    const dataToCopy = activeTab === 'actions' && selectedLog
      ? JSON.stringify(selectedLog, null, 2)
      : JSON.stringify(currentState, null, 2);

    navigator.clipboard.writeText(dataToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSnapshot = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      capturedAt: new Date().toISOString(),
      actionCount: logs.length,
      lastAction: selectedLog?.action,
      reduxState: currentState,
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `redux-state-snapshot-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setScreenshotGenerated(true);
    setTimeout(() => setScreenshotGenerated(false), 2500);
  };

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 w-full md:w-[620px] transition-all duration-300 shadow-2xl ${
        isMinimized ? 'h-14' : 'h-[520px]'
      } flex flex-col rounded-t-3xl border border-slate-700 bg-slate-950 text-slate-100 backdrop-blur-xl`}
    >
      {/* DevTools Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-5 py-3 rounded-t-3xl select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-tr from-purple-600 to-indigo-600 text-white shadow-xs">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider text-white uppercase">
                Redux DevTools Inspector
              </span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Active Extension Wired
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Tracking <code className="text-indigo-300">cartReducer</code> & <code className="text-rose-300">wishlistReducer</code> state changes
            </p>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            title={isMinimized ? 'Expand Inspector' : 'Minimize Inspector'}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-rose-400"
            title="Close Panel"
          >
            <span className="text-xs font-bold font-mono">✕</span>
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* DevTools Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-4 py-2 text-xs font-semibold text-slate-400">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab('actions')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all ${
                  activeTab === 'actions'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Activity className="h-3.5 w-3.5" />
                <span>Action Log ({logs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('state')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all ${
                  activeTab === 'state'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>State Tree</span>
              </button>

              <button
                onClick={() => setActiveTab('diff')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all ${
                  activeTab === 'diff'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Action Diff</span>
              </button>

              <button
                onClick={() => setActiveTab('screenshot')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all ${
                  activeTab === 'screenshot'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'hover:bg-slate-800 hover:text-purple-300'
                }`}
              >
                <Camera className="h-3.5 w-3.5" />
                <span>📸 Screenshot Generator</span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setLogs([])}
                title="Clear Logs"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-rose-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Main Body per Tab */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
            {/* TAB 1: ACTION HISTORY LOG */}
            {activeTab === 'actions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
                {/* Left Column: Action Stream */}
                <div className="space-y-1.5 overflow-y-auto max-h-[360px] pr-1">
                  {logs.length === 0 ? (
                    <div className="p-4 text-center text-slate-500 font-sans text-xs">
                      No actions dispatched yet. Try adding items to Cart or Wishlist!
                    </div>
                  ) : (
                    logs.map((log) => {
                      const isSelected = selectedLog?.id === log.id;
                      const isCart = log.action.type.startsWith('cart');
                      const isWishlist = log.action.type.startsWith('wishlist');
                      const isOffers = log.action.type.startsWith('offers');

                      return (
                        <div
                          key={log.id}
                          onClick={() => setSelectedLogId(log.id)}
                          className={`flex items-center justify-between rounded-xl border p-2.5 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-indigo-500 bg-indigo-950/60 shadow-xs'
                              : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="space-y-1 overflow-hidden pr-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                                  isCart
                                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                                    : isWishlist
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : isOffers
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {log.action.type}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 block truncate">
                              @ {log.timestamp}
                            </span>
                          </div>
                          <span className="text-[10px] font-sans font-bold text-slate-500">
                            →
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Right Column: Payload Inspector */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 overflow-y-auto max-h-[360px]">
                  {selectedLog ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[11px] font-bold text-indigo-400">
                          {selectedLog.action.type}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {selectedLog.timestamp}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">
                          Action Payload:
                        </span>
                        <pre className="rounded-xl bg-slate-950 p-3 text-[11px] text-emerald-400 overflow-x-auto border border-slate-800">
                          {JSON.stringify(
                            'payload' in selectedLog.action
                              ? selectedLog.action.payload
                              : { type: selectedLog.action.type },
                            null,
                            2
                          )}
                        </pre>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={handleCopyJSON}
                          className="flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:bg-slate-700 font-sans"
                        >
                          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          <span>{copied ? 'Copied' : 'Copy Action'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-slate-500 font-sans">
                      Select an action on the left to inspect payload
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: LIVE STATE TREE */}
            {activeTab === 'state' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-sans">
                    Combined Root Redux State Tree (cart, wishlist, offers):
                  </span>
                  <button
                    onClick={handleCopyJSON}
                    className="flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] text-slate-200 hover:bg-slate-700 font-sans font-semibold"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? 'Copied' : 'Copy State Tree'}</span>
                  </button>
                </div>

                <pre className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-[11px] leading-relaxed text-indigo-300 overflow-x-auto max-h-[320px]">
                  {JSON.stringify(currentState, null, 2)}
                </pre>
              </div>
            )}

            {/* TAB 3: ACTION STATE DIFF */}
            {activeTab === 'diff' && (
              <div className="space-y-3">
                {selectedLog ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-sans text-slate-300">
                      <span>Diff for <code className="text-indigo-400 font-mono">{selectedLog.action.type}</code></span>
                      <span className="text-slate-500 text-[11px]">{selectedLog.timestamp}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] text-rose-400 font-sans block mb-1">
                          BEFORE (Prev State Cart Count: {selectedLog.prevState.cart.items.length})
                        </span>
                        <pre className="rounded-xl border border-rose-900/30 bg-rose-950/20 p-3 text-[10px] text-rose-200 overflow-x-auto max-h-[260px]">
                          {JSON.stringify(selectedLog.prevState, null, 2)}
                        </pre>
                      </div>

                      <div>
                        <span className="text-[10px] text-emerald-400 font-sans block mb-1">
                          AFTER (Next State Cart Count: {selectedLog.nextState.cart.items.length})
                        </span>
                        <pre className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-3 text-[10px] text-emerald-200 overflow-x-auto max-h-[260px]">
                          {JSON.stringify(selectedLog.nextState, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 font-sans text-xs">
                    Dispatch an action to compare state diffs.
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: 📸 SCREENSHOT & STATE TRACKER SNAPSHOT */}
            {activeTab === 'screenshot' && (
              <div className="space-y-4 font-sans">
                <div className="rounded-2xl bg-linear-to-r from-purple-900/40 via-indigo-900/40 to-slate-900/40 p-4 border border-purple-500/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Camera className="h-4 w-4 text-purple-400" />
                        <span>Requirement 5: Redux DevTools State Snapshot</span>
                      </h4>
                      <p className="mt-1 text-xs text-slate-300">
                        Capture and export a structured screenshot artifact tracking state transitions across <code className="text-indigo-300 font-mono">cartReducer</code> and <code className="text-rose-300 font-mono">wishlistReducer</code>.
                      </p>
                    </div>

                    <button
                      onClick={handleDownloadSnapshot}
                      className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-purple-500 shadow-md transition-all active:scale-95 shrink-0"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export Snapshot Artifact</span>
                    </button>
                  </div>
                </div>

                {/* Printable / Visual Snapshot Card */}
                <div
                  ref={screenshotRef}
                  className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl space-y-4 text-slate-100"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-rose-500" />
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="ml-2 font-mono text-xs font-bold text-slate-300">
                        Redux DevTools Tracker Screenshot
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">
                      {new Date().toLocaleString()}
                    </span>
                  </div>

                  {/* Quick Metric Pills */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">
                        cartReducer Items
                      </span>
                      <span className="text-lg font-black text-indigo-400 font-mono">
                        {currentState.cart.items.reduce((s, i) => s + i.quantity, 0)} items
                      </span>
                    </div>

                    <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">
                        wishlistReducer Items
                      </span>
                      <span className="text-lg font-black text-rose-400 font-mono">
                        {currentState.wishlist.items.length} saved
                      </span>
                    </div>

                    <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">
                        Thunk Offers Fetched
                      </span>
                      <span className="text-lg font-black text-amber-400 font-mono">
                        {currentState.offers.items.length} offers
                      </span>
                    </div>
                  </div>

                  {/* Actions History Summary */}
                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-2">
                      Recent Action Stream ({logs.length} logged):
                    </span>
                    <div className="max-h-32 overflow-y-auto space-y-1 font-mono text-[11px] rounded-xl bg-slate-950 p-3 border border-slate-800">
                      {logs.slice(0, 5).map((l) => (
                        <div key={l.id} className="flex justify-between text-slate-400">
                          <span className="text-indigo-300 font-bold">{l.action.type}</span>
                          <span>{l.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {screenshotGenerated && (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-950/80 p-3 text-xs font-semibold text-emerald-300 border border-emerald-800">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>State snapshot JSON artifact downloaded successfully!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
