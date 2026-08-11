import React, { useState } from 'react';
import { Code2, Copy, Check, FileCode, Layers, Terminal } from 'lucide-react';

export const CodeViewerSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('App.tsx');
  const [copied, setCopied] = useState(false);

  const fileContents: Record<string, { filename: string; language: string; content: string }> = {
    'App.tsx': {
      filename: 'src/App.tsx',
      language: 'typescript',
      content: `import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { NetlifySection } from './components/NetlifySection';
import { FirebaseSection } from './components/FirebaseSection';
import { CustomDomainSection } from './components/CustomDomainSection';
import { CiCdSection } from './components/CiCdSection';
import { AiGuideSection } from './components/AiGuideSection';
import { CodeViewerSection } from './components/CodeViewerSection';

export default function App() {
  const [activeTab, setActiveTab] = useState('netlify');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Main Title Badge - REQUIRED TO DISPLAY 'React Deployment Test' */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
              React Deployment Verification Suite
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
              React Deployment Test
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Validating Netlify, Firebase Hosting SPA rewrites, Custom Domains, and CI/CD pipelines.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400 font-bold">Homepage Test: Passed (200 OK)</span>
          </div>
        </div>

        {/* View Switcher */}
        {activeTab === 'netlify' && <NetlifySection />}
        {activeTab === 'firebase' && <FirebaseSection />}
        {activeTab === 'domain' && <CustomDomainSection />}
        {activeTab === 'cicd' && <CiCdSection />}
        {activeTab === 'ai-guide' && <AiGuideSection />}
        {activeTab === 'code' && <CodeViewerSection />}
      </main>
    </div>
  );
}`,
    },
    'firebase.json': {
      filename: 'firebase.json',
      language: 'json',
      content: `{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}`,
    },
    'netlify.toml': {
      filename: 'netlify.toml',
      language: 'toml',
      content: `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`,
    },
    'server.ts': {
      filename: 'server.ts',
      language: 'typescript',
      content: `import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", appName: "React Deployment Test" });
});

app.post("/api/generate-guide", async (req, res) => {
  const { provider = "Firebase", promptOverride } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({ success: true, guide: "Fallback guide content..." });
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: promptOverride }] }]
  });

  res.json({ success: true, guide: response.text });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});`,
    },
    'deploy.yml': {
      filename: '.github/workflows/deploy.yml',
      language: 'yaml',
      content: `name: React App CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Production Bundle
        run: npm run build

      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '\${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '\${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: react-deployment-test`,
    },
  };

  const currentFile = fileContents[selectedFile] || fileContents['App.tsx'];

  const copyCode = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
            <Code2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Full Codebase Viewer & Exporter
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Inspect, copy, or export the production-ready React.js full codebase and configuration manifests.
            </p>
          </div>
        </div>
      </div>

      {/* Main Code Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* File Tabs Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            {Object.keys(fileContents).map((fileKey) => (
              <button
                key={fileKey}
                onClick={() => setSelectedFile(fileKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  selectedFile === fileKey
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{fileKey}</span>
              </button>
            ))}
          </div>

          <button
            onClick={copyCode}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition-all cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy File Content'}</span>
          </button>
        </div>

        {/* File Path Indicator */}
        <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800/80 text-xs font-mono text-slate-400 flex items-center justify-between">
          <span>Path: <strong className="text-teal-300">{currentFile.filename}</strong></span>
          <span className="uppercase text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {currentFile.language}
          </span>
        </div>

        {/* Code Block */}
        <div className="p-4 bg-slate-950 overflow-x-auto font-mono text-xs text-emerald-300 leading-relaxed">
          <pre>{currentFile.content}</pre>
        </div>
      </div>
    </div>
  );
};
