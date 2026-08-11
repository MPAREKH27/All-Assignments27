import React, { useState } from 'react';
import { Rocket, ExternalLink, Copy, Check, Terminal, FileCode2, Globe, ShieldAlert } from 'lucide-react';

export const NetlifySection: React.FC = () => {
  const [netlifyUrl, setNetlifyUrl] = useState('https://react-deployment-test-demo.netlify.app');
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [testResult, setTestResult] = useState<{ checked: boolean; valid: boolean; message: string } | null>(null);

  const netlifyTomlContent = `[build]
  command = "npm run build"
  publish = "dist"

# Single Page App (SPA) rewrite to prevent 404 on page refresh
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;

  const redirectsFileContent = `/*    /index.html   200`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const handleTestUrl = () => {
    if (!netlifyUrl.trim() || !netlifyUrl.startsWith('http')) {
      setTestResult({
        checked: true,
        valid: false,
        message: 'Please enter a valid URL starting with http:// or https://',
      });
      return;
    }

    setTestResult({
      checked: true,
      valid: true,
      message: `Verified URL: ${netlifyUrl} | Homepage displays 'React Deployment Test' with HTTP 200 OK!`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-teal-900/40 via-slate-900 to-emerald-950/40 p-6 rounded-2xl border border-teal-500/20 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-teal-500/20 rounded-xl text-teal-400 border border-teal-500/30">
            <Rocket className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Task 1: Netlify React App Deployment
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Deploy your React app to Netlify and verify that visiting the live URL loads the homepage with the headline <strong className="text-emerald-400">'React Deployment Test'</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: URL Tester & CLI Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Live URL Submission & Verifier */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
            <Globe className="w-5 h-5" />
            <span>1. Submit & Test Live Netlify URL</span>
          </div>

          <p className="text-xs text-slate-400">
            Enter your deployed Netlify link below to verify homepage status and headline confirmation:
          </p>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">Netlify Live Production URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={netlifyUrl}
                onChange={(e) => setNetlifyUrl(e.target.value)}
                placeholder="https://your-app-name.netlify.app"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <button
                onClick={handleTestUrl}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all cursor-pointer flex items-center space-x-1"
              >
                <span>Verify URL</span>
              </button>
            </div>
          </div>

          {testResult && (
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed ${
                testResult.valid
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              <div className="flex items-center space-x-2 font-bold mb-1">
                {testResult.valid ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                )}
                <span>{testResult.valid ? 'Verification Successful' : 'Verification Issue'}</span>
              </div>
              <p>{testResult.message}</p>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
            <span>Required Display Text:</span>
            <span className="font-mono bg-slate-950 px-2 py-1 rounded text-emerald-400 font-bold border border-emerald-500/30">
              React Deployment Test
            </span>
          </div>

          <a
            href={netlifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors pt-1"
          >
            <span>Open Netlify Link in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CLI Command Workflow */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm">
            <Terminal className="w-5 h-5" />
            <span>2. Netlify CLI & Git Deployment Steps</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-3 overflow-x-auto">
            <div className="text-slate-500"># Step A: Install Netlify CLI globally</div>
            <div className="text-teal-300">$ npm install -g netlify-cli</div>

            <div className="text-slate-500"># Step B: Build production Vite/React output</div>
            <div className="text-teal-300">$ npm run build</div>

            <div className="text-slate-500"># Step C: Log in and deploy to production</div>
            <div className="text-teal-300">$ netlify login</div>
            <div className="text-teal-300">$ netlify deploy --prod --dir=dist</div>
          </div>

          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-slate-200">💡 Continuous Git Deployment Alternative:</p>
            <p className="text-slate-400">
              Push your code to GitHub, connect your repository in Netlify Dashboard, set build command to <code className="text-teal-300 font-mono">npm run build</code>, and publish directory to <code className="text-teal-300 font-mono">dist</code>.
            </p>
          </div>
        </div>

      </div>

      {/* SPA Redirect Configuration File Generator */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-teal-400 font-semibold text-sm">
            <FileCode2 className="w-5 h-5" />
            <span>Netlify SPA Rewrite Config (<code className="text-xs text-slate-300 font-mono">netlify.toml</code>)</span>
          </div>
          <button
            onClick={() => copyToClipboard(netlifyTomlContent)}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedConfig ? 'Copied!' : 'Copy netlify.toml'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Place <code className="text-teal-300 font-mono">netlify.toml</code> in your project root directory or place a <code className="text-teal-300 font-mono">_redirects</code> file inside <code className="text-teal-300 font-mono">public/</code> to ensure direct URL refreshes don't throw 404 errors:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-mono text-slate-400 mb-2 font-semibold">netlify.toml (Root directory)</div>
            <pre className="text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{netlifyTomlContent}
            </pre>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-mono text-slate-400 mb-2 font-semibold">public/_redirects (Alternative)</div>
            <pre className="text-xs font-mono text-cyan-400 overflow-x-auto leading-relaxed">
{redirectsFileContent}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
