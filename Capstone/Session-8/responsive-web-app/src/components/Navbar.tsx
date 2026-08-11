import React, { useState } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Menu, 
  X, 
  Zap, 
  CheckCircle2, 
  FileText, 
  Sun, 
  Moon, 
  Globe,
  Sparkles,
  Layout
} from 'lucide-react';
import { DeviceMode } from '../types';

interface NavbarProps {
  currentDevice: DeviceMode;
  onSelectDevice: (device: DeviceMode) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  lighthouseScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDevice,
  onSelectDevice,
  activeTab,
  setActiveTab,
  highContrast,
  setHighContrast,
  lighthouseScore,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'app', label: 'App Homepage', icon: Layout },
    { id: 'diffs', label: '1 & 2. Responsive Views', icon: Smartphone },
    { id: 'browser', label: '3. Firefox vs Chrome', icon: Globe },
    { id: 'lighthouse', label: '4. Lighthouse Audit', icon: Zap },
    { id: 'chatgpt', label: '5. ChatGPT Fixes', icon: Sparkles },
    { id: 'report', label: 'Assignment Report', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('app')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              ⚡
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">DevPulse</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                  React 19
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Responsive App & Audit Lab</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  {link.id === 'lighthouse' && (
                    <span
                      className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        lighthouseScore >= 90
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {lighthouseScore}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2">
            {/* Quick Viewport Device Switcher */}
            <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700/80">
              <button
                onClick={() => onSelectDevice('mobile')}
                title="Simulate iPhone X Mobile (375px)"
                className={`p-1.5 rounded-md transition-colors ${
                  currentDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectDevice('tablet')}
                title="Simulate Tablet (768px)"
                className={`p-1.5 rounded-md transition-colors ${
                  currentDevice === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectDevice('desktop')}
                title="Simulate Desktop (1280px)"
                className={`p-1.5 rounded-md transition-colors ${
                  currentDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            {/* High Contrast Mode Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              title={highContrast ? 'Switch to Standard Theme' : 'Enable WCAG AA High Contrast Mode'}
              className={`p-2 rounded-lg border transition-all ${
                highContrast
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {highContrast ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Report Button */}
            <button
              onClick={() => setActiveTab('report')}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-95 transition-opacity shadow-md shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full Answers (1-5)</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="text-xs font-semibold uppercase text-slate-400 px-2 pt-2">Lab Navigation</div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.id === 'lighthouse' && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                    Score: {lighthouseScore}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-2">
            <span className="text-xs text-slate-400">Simulate Viewport:</span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => {
                  onSelectDevice('mobile');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  currentDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                iPhone X
              </button>
              <button
                onClick={() => {
                  onSelectDevice('tablet');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  currentDevice === 'tablet' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Tablet
              </button>
              <button
                onClick={() => {
                  onSelectDevice('desktop');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  currentDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Desktop
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
