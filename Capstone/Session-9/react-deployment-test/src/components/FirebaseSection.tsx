import React, { useState } from 'react';
import { Flame, Copy, Check, Terminal, ShieldCheck, HelpCircle, Layers, FolderCheck } from 'lucide-react';

export const FirebaseSection: React.FC = () => {
  const [buildFolder, setBuildFolder] = useState<'dist' | 'build'>('dist');
  const [enableRewrites, setEnableRewrites] = useState(true);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [activeCliStep, setActiveCliStep] = useState(0);

  const firebaseJsonContent = JSON.stringify(
    {
      hosting: {
        public: buildFolder,
        ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
        ...(enableRewrites
          ? {
              rewrites: [
                {
                  source: '**',
                  destination: '/index.html',
                },
              ],
            }
          : {}),
      },
    },
    null,
    2
  );

  const cliSimulationSteps = [
    {
      command: 'firebase login',
      output: '✔  Success! Logged in as developer@example.com',
      explanation: 'Authenticates your CLI with your Google Firebase credentials.',
    },
    {
      command: 'firebase init hosting',
      output: `? What do you want to use as your public directory? ${buildFolder}\n? Configure as a single-page app (rewrite all urls to /index.html)? ${enableRewrites ? 'Yes' : 'No'}\n? Set up automatic builds and deploys with GitHub? No\n✔  Firebase initialization complete!`,
      explanation: 'Generates firebase.json and configures SPA catch-all rewrites.',
    },
    {
      command: 'npm run build',
      output: 'vite v6.2.3 building for production...\ndist/index.html   0.45 kB\ndist/assets/index.js   142.30 kB\n✓ built in 1.28s',
      explanation: 'Compiles React source into static production artifacts in the dist/ directory.',
    },
    {
      command: 'firebase deploy',
      output: `=== Deploying to 'react-deployment-test'...\ni  hosting[react-deployment-test]: beginning deploy...\ni  hosting[react-deployment-test]: found 4 files in ${buildFolder}\n✔  hosting[react-deployment-test]: file upload complete\n✔  Deploy complete!\n\nHosting URL: https://react-deployment-test.web.app`,
      explanation: 'Uploads static files to Firebase global CDN with immediate SSL deployment.',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(firebaseJsonContent);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-amber-900/40 via-slate-900 to-orange-950/40 p-6 rounded-2xl border border-amber-500/20 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Task 2: Firebase Hosting Setup & SPA 404 Fix
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Configure <code className="text-amber-400 font-mono font-bold">firebase.json</code> so that visiting root and deep routes serves your React app without any 404 errors.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Firebase.json Generator Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Settings Box */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-5">
          <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm">
            <Layers className="w-5 h-5" />
            <span>Firebase Hosting Configuration Controls</span>
          </div>

          {/* Build Folder Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FolderCheck className="w-4 h-4 text-cyan-400" />
              <span>Public Build Output Directory</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBuildFolder('dist')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  buildFolder === 'dist'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                dist (Vite Standard)
              </button>
              <button
                onClick={() => setBuildFolder('build')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  buildFolder === 'build'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                build (CRA Standard)
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Vite outputs compiled assets into <code className="text-amber-300 font-mono">dist</code>. Setting this correctly prevents 404 errors when deploying.
            </p>
          </div>

          {/* SPA Rewrites Switch */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">SPA Catch-all Rewrites</span>
              <button
                onClick={() => setEnableRewrites(!enableRewrites)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  enableRewrites
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {enableRewrites ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maps all request paths (<code className="text-amber-300 font-mono">**</code>) to <code className="text-amber-300 font-mono">/index.html</code> so client-side React Router handles URLs without web server 404 page errors.
            </p>
          </div>

          {/* 404 Prevention Check Indicator */}
          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
            enableRewrites
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
          }`}>
            <div className="flex items-center space-x-2 font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{enableRewrites ? 'Protected Against 404 Errors' : 'Warning: 404 Risk On Direct Sub-route Refresh'}</span>
            </div>
            <p>
              {enableRewrites
                ? 'Your firebase.json contains the required rewrites array. Direct link visits and page refreshes will execute seamlessly!'
                : 'Without rewrites, entering URLs like /dashboard or refreshing deep pages will trigger a standard Firebase 404 error.'}
            </p>
          </div>
        </div>

        {/* Live Generated firebase.json View */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm">
              <Terminal className="w-5 h-5" />
              <span>Generated <code className="text-xs text-amber-300 font-mono">firebase.json</code></span>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedConfig ? 'Copied!' : 'Copy Config'}</span>
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <pre className="text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed">
{firebaseJsonContent}
            </pre>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 text-xs text-slate-300 flex items-start space-x-2">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              <strong>Hint from prompt:</strong> Always run <code className="text-amber-300 font-mono">firebase init hosting</code> in project root, specify <code className="text-amber-300 font-mono">{buildFolder}</code> as public directory, and select <strong>Yes</strong> when asked to configure as single-page app!
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Firebase CLI Command Step Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span>Interactive Firebase CLI Deployment Simulator</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {cliSimulationSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCliStep(idx)}
              className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                activeCliStep === idx
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Step {idx + 1}
              </div>
              <div className="font-mono mt-1 truncate">{step.command}</div>
            </button>
          ))}
        </div>

        {/* Command Output Panel */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span>Executing command: <strong className="text-amber-300">{cliSimulationSteps[activeCliStep].command}</strong></span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              SIMULATION ACTIVE
            </span>
          </div>

          <pre className="text-slate-200 whitespace-pre-wrap font-mono leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
{cliSimulationSteps[activeCliStep].output}
          </pre>

          <p className="text-slate-400 text-[11px] font-sans">
            ℹ️ {cliSimulationSteps[activeCliStep].explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
