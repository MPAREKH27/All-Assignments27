import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesGrid } from './components/FeaturesGrid';
import { DevToolsSimulator } from './components/DevToolsSimulator';
import { CrossBrowserTester } from './components/CrossBrowserTester';
import { LighthouseAuditPanel } from './components/LighthouseAuditPanel';
import { ChatGPTAdvisorPanel } from './components/ChatGPTAdvisorPanel';
import { AssignmentReport } from './components/AssignmentReport';
import { TESTIMONIALS } from './data/mockData';
import { DeviceMode } from './types';
import { 
  Star, 
  Smartphone, 
  Zap, 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  ShieldCheck, 
  Github, 
  Heart,
  FileText
} from 'lucide-react';

export default function App() {
  const [currentDevice, setCurrentDevice] = useState<DeviceMode>('responsive');
  const [activeTab, setActiveTab] = useState<string>('app');
  
  // Optimization states for Lighthouse & ChatGPT fixes
  const [highContrast, setHighContrast] = useState<boolean>(true);
  const [optimizedImages, setOptimizedImages] = useState<boolean>(true);
  const [lazyLoad, setLazyLoad] = useState<boolean>(true);
  const [contentVisibility, setContentVisibility] = useState<boolean>(true);

  // Dynamically calculate Lighthouse score based on active fixes
  const calculateLighthouseScore = () => {
    let base = 74;
    if (optimizedImages) base += 10;
    if (highContrast) base += 8;
    if (lazyLoad) base += 6;
    return Math.min(98, base);
  };

  const lighthouseScore = calculateLighthouseScore();

  const handleApplyAllFixes = () => {
    setOptimizedImages(true);
    setHighContrast(true);
    setLazyLoad(true);
    setContentVisibility(true);
  };

  // Standard React Homepage Content
  const renderHomepageContent = () => (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans antialiased">
      <Hero
        highContrast={highContrast}
        optimizedImages={optimizedImages}
        onExploreAudits={() => setActiveTab('lighthouse')}
        onViewDeviceDiffs={() => setActiveTab('diffs')}
      />

      <FeaturesGrid
        highContrast={highContrast}
        optimizedImages={optimizedImages}
        lazyLoad={lazyLoad}
        contentVisibility={contentVisibility}
      />

      {/* Customer Testimonials Section */}
      <section className="py-12 sm:py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Verified Engineering QA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Trusted by Frontend Developers
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Engineered with responsive React 19 architecture and cross-browser resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4 shadow-lg"
              >
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{item.content}"
                </p>
                <div className="flex items-center space-x-3 pt-2 border-t border-slate-700/80">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    width="40"
                    height="40"
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{item.name}</h4>
                    <p className="text-xs text-slate-400">
                      {item.role} • <span className="text-indigo-400">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-200 text-sm">DevPulse React App</span>
            <span className="text-slate-600">•</span>
            <span>Mobile, Cross-Browser & Lighthouse Audit Lab</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('report')}
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Assignment Q1-Q5 Report</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">React 19 + Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Primary Navigation Bar */}
      <Navbar
        currentDevice={currentDevice}
        onSelectDevice={(device) => {
          setCurrentDevice(device);
          if (device !== 'responsive' && activeTab === 'app') {
            setActiveTab('diffs');
          }
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        lighthouseScore={lighthouseScore}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'app' && renderHomepageContent()}

        {activeTab === 'diffs' && (
          <DevToolsSimulator
            currentDevice={currentDevice}
            onSelectDevice={setCurrentDevice}
          >
            {renderHomepageContent()}
          </DevToolsSimulator>
        )}

        {activeTab === 'browser' && <CrossBrowserTester />}

        {activeTab === 'lighthouse' && (
          <LighthouseAuditPanel
            score={lighthouseScore}
            optimizedImages={optimizedImages}
            setOptimizedImages={setOptimizedImages}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
            lazyLoad={lazyLoad}
            setLazyLoad={setLazyLoad}
            onApplyAllFixes={handleApplyAllFixes}
          />
        )}

        {activeTab === 'chatgpt' && (
          <ChatGPTAdvisorPanel
            contentVisibility={contentVisibility}
            setContentVisibility={setContentVisibility}
          />
        )}

        {activeTab === 'report' && <AssignmentReport />}
      </main>
    </div>
  );
}
