import React, { useState } from 'react';
import { Bot, Code, Play, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';
import { fetchPlaylistsFromFirestore, fetchReviewsFromFirestore, fetchWatchlistFromFirestore } from '../lib/firebase';

export const ChatGPTCodeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'refactored' | 'legacy' | 'liveTest'>('refactored');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedApi, setSelectedApi] = useState<'playlists' | 'reviews' | 'watchlists'>('playlists');

  // Test Execution State
  const [testResult, setTestResult] = useState<any>(null);
  const [testing, setTesting] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const handleRunRefactoredTest = async () => {
    setTesting(true);
    setTestResult(null);
    const start = performance.now();

    try {
      let res;
      if (selectedApi === 'playlists') {
        res = await fetchPlaylistsFromFirestore();
      } else if (selectedApi === 'reviews') {
        res = await fetchReviewsFromFirestore();
      } else {
        res = await fetchWatchlistFromFirestore();
      }

      const duration = (performance.now() - start).toFixed(2);
      setExecutionTime(Number(duration));
      setTestResult(res);
    } catch (err: any) {
      const duration = (performance.now() - start).toFixed(2);
      setExecutionTime(Number(duration));
      setTestResult({
        data: [],
        error: `Caught Unhandled Exception: ${err?.message || 'Unknown error'}`
      });
    } finally {
      setTesting(false);
    }
  };

  const legacyCodeSnippet = `// ❌ LEGACY UNHANDLED PROMISE / CALLBACK PATTERN
// Problem: Lack of try/catch, unhandled rejections, no response payload wrapper
function getPlaylistsOld() {
  getDocs(collection(db, 'playlists')).then((snapshot) => {
    const list = snapshot.docs.map(doc => doc.data());
    console.log(list);
  });
}`;

  const chatGptRefactoredCode = `// ✅ CHATGPT REFACTORED API CALL WITH ASYNC/AWAIT & ERROR HANDLING
// Prompt: "Refactor this API call with async/await and better error handling."

export async function fetchPlaylistsFromFirestore(): Promise<{ data: Playlist[]; error: string | null }> {
  try {
    const playlistsCol = collection(db, 'playlists');
    const playlistSnapshot: QuerySnapshot<DocumentData> = await getDocs(playlistsCol);
    
    if (!playlistSnapshot.empty) {
      const playlistsList: Playlist[] = playlistSnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      })) as Playlist[];
      
      return { data: playlistsList, error: null };
    }
    
    // Graceful empty check / Local fallback state
    const localPlaylists = getLocalCollection(LOCAL_STORAGE_KEY_PLAYLISTS, INITIAL_PLAYLISTS);
    return { data: localPlaylists, error: null };
  } catch (err: any) {
    console.error('Firestore Error in fetchPlaylistsFromFirestore:', err);
    return { 
      data: [], 
      error: err?.message || 'An unexpected Firestore error occurred.' 
    };
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(chatGptRefactoredCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">ChatGPT Code Refactoring</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Requirement #5
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-0.5">
              Refactored Firestore API calls with clean <code className="text-indigo-300 font-mono">async/await</code> and comprehensive <code className="text-indigo-300 font-mono">try/catch</code> error handling.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunRefactoredTest}
          disabled={testing}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          {testing ? 'Executing...' : 'Test Refactored Function'}
        </button>
      </div>

      {/* Interactive Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('refactored')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'refactored'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              ChatGPT Improved Version
            </button>
            <button
              onClick={() => setActiveTab('legacy')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'legacy'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              Legacy Callback Code
            </button>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold cursor-pointer border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Code' : 'Copy ChatGPT Code'}
          </button>
        </div>

        {/* Tab 1: ChatGPT Improved Async/Await Version */}
        {activeTab === 'refactored' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-500/30 p-3 rounded-xl text-indigo-300 text-xs font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Prompt: "Refactor this API call with async/await and better error handling."
              </span>
              <span className="font-mono">TypeScript / ES2022</span>
            </div>

            <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-indigo-300 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
              <code>{chatGptRefactoredCode}</code>
            </pre>
          </div>
        )}

        {/* Tab 2: Legacy Callback Code */}
        {activeTab === 'legacy' && (
          <div className="space-y-4">
            <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Legacy Unrefactored Version (Lacks try/catch error handling & promise typing)
            </div>

            <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-slate-400 font-mono text-xs overflow-x-auto leading-relaxed">
              <code>{legacyCodeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Live Test Executor Section */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Play className="w-4 h-4 text-indigo-400" />
              Live Execution Tester
            </h4>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Target Firestore Endpoint:</span>
              <select
                value={selectedApi}
                onChange={(e) => setSelectedApi(e.target.value as any)}
                className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-indigo-500"
              >
                <option value="playlists">fetchPlaylistsFromFirestore()</option>
                <option value="reviews">fetchReviewsFromFirestore()</option>
                <option value="watchlists">fetchWatchlistFromFirestore()</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleRunRefactoredTest}
            disabled={testing}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/20 cursor-pointer flex items-center justify-center gap-2"
          >
            {testing ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Executing Async Firestore Call...
              </span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Run {selectedApi === 'playlists' ? 'fetchPlaylistsFromFirestore()' : selectedApi === 'reviews' ? 'fetchReviewsFromFirestore()' : 'fetchWatchlistFromFirestore()'}
              </>
            )}
          </button>

          {/* Test Results Output */}
          {testResult && (
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  API Response Received ({testResult.data?.length || 0} items)
                </span>
                {executionTime !== null && (
                  <span className="text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 text-[11px]">
                    Latency: {executionTime}ms
                  </span>
                )}
              </div>

              <div>
                <span className="text-slate-500">Error Payload: </span>
                <span className={testResult.error ? 'text-amber-400' : 'text-emerald-400 font-bold'}>
                  {testResult.error ? testResult.error : 'null (Clean Execution)'}
                </span>
              </div>

              <div>
                <p className="text-slate-400 mb-1">Returned JSON Data:</p>
                <pre className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300 max-h-48 overflow-y-auto font-mono text-[11px]">
                  {JSON.stringify(testResult.data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
