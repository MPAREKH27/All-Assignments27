import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Song, ActionLog } from '../types';
import { addSong, removeSong, subscribeToLogs, actionLogs } from '../redux/store';
import {
  Code,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Layers,
  FileCode,
  Info
} from 'lucide-react';

export const ReduxStateInspector: React.FC = () => {
  const playlist = useSelector((state: Song[]) => state);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<'steps' | 'state' | 'logs'>('steps');
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [logs, setLogs] = useState<ActionLog[]>([...actionLogs]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToLogs((updatedLogs) => {
      setLogs([...updatedLogs]);
    });
    return unsubscribe;
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Pure string view of state for simplified prompt compliance
  const rawSongTitles = playlist.map((s) => s.title);

  const stepDetails = [
    {
      step: 1,
      title: '1. Redux Action Creator (addSong)',
      description: 'Creates a Redux action called addSong taking a song name as payload.',
      code: `// 1. Action Creator addSong
export const ADD_SONG = 'ADD_SONG';

export function addSong(songName) {
  return {
    type: ADD_SONG,
    payload: songName
  };
}

// Example action object returned:
// { type: 'ADD_SONG', payload: 'Kesariya' }`,
      interactiveAction: () => dispatch(addSong('Kesariya')),
      actionLabel: "Dispatch addSong('Kesariya')",
    },
    {
      step: 2,
      title: '2. Reducer Function (playlistReducer)',
      description: 'Reducer function that handles ADD_SONG and returns a new playlist array with the added song.',
      code: `// 2. Reducer Function playlistReducer
export function playlistReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_SONG':
      return [...state, action.payload];
    default:
      return state;
  }
}

// Test Sample Action
const initialState = [];
const sampleAction = addSong('Shape of You');
const nextState = playlistReducer(initialState, sampleAction);
console.log('Sample Test Result:', nextState);
// Output: ['Shape of You']`,
      interactiveAction: () => dispatch(addSong('Shape of You')),
      actionLabel: "Dispatch addSong('Shape of You')",
    },
    {
      step: 3,
      title: '3. Redux Store & Initial Dispatches',
      description: "Setup Redux store using createStore, then dispatch 'Kesariya' and 'Shape of You'.",
      code: `// 3. Set up Redux Store using createStore
import { legacy_createStore as createStore } from 'redux';

const store = createStore(playlistReducer);

// Dispatch two addSong actions
store.dispatch(addSong('Kesariya'));
store.dispatch(addSong('Shape of You'));

// Log the updated state
console.log('Updated State:', store.getState());
// State: ['Kesariya', 'Shape of You']`,
      interactiveAction: () => {
        dispatch(addSong('Kesariya'));
        dispatch(addSong('Shape of You'));
      },
      actionLabel: "Dispatch Both ('Kesariya' & 'Shape of You')",
    },
    {
      step: 4,
      title: '4. React Integration (Provider & useSelector)',
      description: 'Connect Redux store with React component using Provider and useSelector.',
      code: `// 4. React Integration with react-redux
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';

function PlaylistComponent() {
  // Extract songs array from store
  const playlist = useSelector((state) => state);

  return (
    <ul>
      {playlist.map((song, index) => (
        <li key={index}>{song.title || song}</li>
      ))}
    </ul>
  );
}

// Wrap root component
export default function App() {
  return (
    <Provider store={store}>
      <PlaylistComponent />
    </Provider>
  );
}`,
      interactiveAction: null,
      actionLabel: null,
    },
    {
      step: 5,
      title: '5. Refactor Reducer for removeSong',
      description: 'Refactor playlistReducer with .filter() to remove a song by its name when clicking Remove.',
      code: `// 5. Refactored Action & Reducer with removeSong
export const REMOVE_SONG = 'REMOVE_SONG';

export function removeSong(songName) {
  return {
    type: REMOVE_SONG,
    payload: songName
  };
}

export function playlistReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_SONG':
      return [...state, action.payload];

    case 'REMOVE_SONG':
      // Filter method removes the song matching action.payload
      return state.filter(song => {
        const title = typeof song === 'string' ? song : song.title;
        return title !== action.payload;
      });

    default:
      return state;
  }
}`,
      interactiveAction: () => {
        if (playlist.length > 0) {
          dispatch(removeSong(playlist[0].title));
        }
      },
      actionLabel: playlist.length > 0 ? `Remove First Song ('${playlist[0].title}')` : 'Playlist Empty',
    },
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 md:p-6 mb-8 shadow-2xl">
      {/* Drawer Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Redux Implementation & Live DevTools
            </h2>
            <p className="text-xs text-zinc-400">
              Interactive step-by-step verification and real-time state inspection
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('steps')}
            id="tab-steps-btn"
            className={`px-3.5 py-1.5 rounded-lg transition ${
              activeTab === 'steps'
                ? 'bg-emerald-500 text-black font-bold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            5-Step Guide
          </button>

          <button
            onClick={() => setActiveTab('state')}
            id="tab-state-btn"
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'state'
                ? 'bg-emerald-500 text-black font-bold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Raw State ({playlist.length})
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            id="tab-logs-btn"
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'logs'
                ? 'bg-emerald-500 text-black font-bold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Dispatch Console ({logs.length})
          </button>
        </div>
      </div>

      {/* TAB 1: 5-STEP GUIDE */}
      {activeTab === 'steps' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Step Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Requirements Checklist:
            </div>

            {stepDetails.map((item) => {
              const isSelected = selectedStep === item.step;
              return (
                <button
                  key={item.step}
                  onClick={() => setSelectedStep(item.step)}
                  id={`step-select-btn-${item.step}`}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-md'
                      : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? 'bg-emerald-500 text-black'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {item.step}
                    </span>
                    <span className="text-xs font-semibold">{item.title.split('.')[1]}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>
              );
            })}
          </div>

          {/* Step Detail Panel */}
          <div className="lg:col-span-8 bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
            {(() => {
              const current = stepDetails.find((s) => s.step === selectedStep)!;
              return (
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-base font-bold text-white">{current.title}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{current.description}</p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(current.code, `step-${current.step}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition border border-zinc-700/80"
                    >
                      {copiedCode === `step-${current.step}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="relative bg-zinc-950 border border-zinc-800/90 rounded-xl p-4 my-3 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed shadow-inner">
                    <pre>{current.code}</pre>
                  </div>

                  {/* Interactive Trigger Button for this step */}
                  {current.interactiveAction && (
                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-xs text-zinc-400">Try running this step live:</span>
                      <button
                        onClick={current.interactiveAction}
                        id={`step-interactive-run-${current.step}`}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-lg transition flex items-center gap-1.5 shadow-md"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        {current.actionLabel}
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 2: RAW REDUX STATE TREE */}
      {activeTab === 'state' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Current Redux State Object (<code className="text-emerald-400">store.getState()</code>):</span>
            <span className="text-emerald-400 font-mono font-semibold">{playlist.length} track(s) total</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Simple titles array (Literal matching requirement 3 & 4) */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300">
              <div className="text-zinc-500 text-[11px] mb-2 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Array of Song Names:</span>
                <span className="text-emerald-400">string[]</span>
              </div>
              <pre className="text-emerald-400 overflow-x-auto">
                {JSON.stringify(rawSongTitles, null, 2)}
              </pre>
            </div>

            {/* Rich Song Object Array */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300">
              <div className="text-zinc-500 text-[11px] mb-2 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Detailed Song Objects State:</span>
                <span className="text-emerald-400">Song[]</span>
              </div>
              <pre className="text-emerald-300 overflow-x-auto max-h-60">
                {JSON.stringify(playlist, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE ACTION DISPATCH CONSOLE LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Real-time Dispatched Action Logs:</span>
            <span className="text-zinc-500 text-[11px]">Showing latest action first</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden font-mono text-xs">
            {logs.length === 0 ? (
              <div className="p-6 text-center text-zinc-500">No actions dispatched yet</div>
            ) : (
              <div className="divide-y divide-zinc-800/80 max-h-80 overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="p-3.5 hover:bg-zinc-900/80 transition space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                          {log.actionType}
                        </span>
                        <span className="text-zinc-300 font-bold">
                          Payload: {JSON.stringify(log.payload)}
                        </span>
                      </div>
                      <span className="text-zinc-500">{log.timestamp}</span>
                    </div>

                    <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 pt-0.5">
                      <span className="text-zinc-500">State After:</span>
                      <code className="text-emerald-300 truncate">
                        [{log.stateAfter.map((s) => `'${s.title}'`).join(', ')}]
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
