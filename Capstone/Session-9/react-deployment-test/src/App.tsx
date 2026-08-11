import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { NetlifySection } from './components/NetlifySection';
import { FirebaseSection } from './components/FirebaseSection';
import { CustomDomainSection } from './components/CustomDomainSection';
import { CiCdSection } from './components/CiCdSection';
import { AiGuideSection } from './components/AiGuideSection';
import { CodeViewerSection } from './components/CodeViewerSection';
import { CheckCircle2, ShieldCheck, Zap, Globe, Rocket, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('netlify');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      {/* Top Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        
        {/* Prominent Headline Hero Card - Displays "React Deployment Test" */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Single-Page Application Deployment Test Engine</span>
              </div>

              {/* REQUIRED DISPLAY HEADLINE: "React Deployment Test" */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                React Deployment Test
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Complete interactive testing suite for React SPA hosting on Netlify & Firebase, custom domain DNS verification, CI/CD pipeline benefits, and AI prompt guides.
              </p>
            </div>

            {/* Status Card */}
            <div className="bg-slate-950/90 border border-slate-800 p-5 rounded-2xl space-y-3 text-xs shrink-0 self-start md:self-auto min-w-[260px] shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-semibold">Live App Homepage</span>
                <span className="bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">
                  HTTP 200 OK
                </span>
              </div>

              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Heading:</span>
                  <span className="text-emerald-400 font-bold">React Deployment Test</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SPA Catch-all:</span>
                  <span className="text-teal-300 font-bold">Active (/index.html)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vite Output:</span>
                  <span className="text-cyan-300 font-bold">dist/</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Section Switcher */}
        {activeTab === 'netlify' && <NetlifySection />}
        {activeTab === 'firebase' && <FirebaseSection />}
        {activeTab === 'domain' && <CustomDomainSection />}
        {activeTab === 'cicd' && <CiCdSection />}
        {activeTab === 'ai-guide' && <AiGuideSection />}
        {activeTab === 'code' && <CodeViewerSection />}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span><strong>React Deployment Test</strong> &bull; SPA 404 Prevention Verified</span>
          </p>
          <p className="text-slate-600">
            Built with React 19, TypeScript, Tailwind CSS & Vite
          </p>
        </div>
      </footer>
    </div>
  );
}
