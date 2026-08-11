import React from 'react';
import { 
  DEVICE_SPECS, 
  LAYOUT_DIFFERENCES 
} from '../data/mockData';
import { DeviceMode } from '../types';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Maximize2, 
  Camera, 
  Menu, 
  Columns, 
  Grid, 
  MousePointer,
  CheckCircle2,
  Info,
  ArrowRight
} from 'lucide-react';

interface DevToolsSimulatorProps {
  currentDevice: DeviceMode;
  onSelectDevice: (device: DeviceMode) => void;
  children: React.ReactNode;
}

export const DevToolsSimulator: React.FC<DevToolsSimulatorProps> = ({
  currentDevice,
  onSelectDevice,
  children,
}) => {
  const activeSpec = DEVICE_SPECS.find((d) => d.id === currentDevice) || DEVICE_SPECS[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Menu':
        return Menu;
      case 'Columns':
        return Columns;
      case 'Grid':
        return Grid;
      case 'MousePointer':
        return MousePointer;
      default:
        return Info;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* DevTools Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 mb-2">
              <Camera className="w-3.5 h-3.5 text-indigo-400" />
              <span>Assignment Q1 & Q2 - Chrome DevTools Simulation</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Device Viewport Simulator</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Simulate Chrome DevTools device mode directly in-app. Switch viewports below to observe responsive menu, hero image, and CTA button layout transformations.
            </p>
          </div>

          {/* Device Selection Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {DEVICE_SPECS.map((spec) => {
              const isSelected = currentDevice === spec.id;
              let Icon = Smartphone;
              if (spec.id === 'tablet') Icon = Tablet;
              if (spec.id === 'desktop') Icon = Monitor;
              if (spec.id === 'responsive') Icon = Maximize2;

              return (
                <button
                  key={spec.id}
                  onClick={() => onSelectDevice(spec.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-lg shadow-indigo-500/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{spec.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewport Specs Sub-bar */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center space-x-4">
            <span>
              <strong className="text-slate-200">Selected Viewport:</strong> {activeSpec.name}
            </span>
            {activeSpec.width > 0 && (
              <span className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                {activeSpec.width} × {activeSpec.height} px
              </span>
            )}
          </div>
          <p className="text-slate-400 italic hidden md:block">{activeSpec.description}</p>
        </div>
      </div>

      {/* Simulated Device Frame Window */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Chrome DevTools Top Bar */}
        <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <span className="font-mono text-slate-400 font-semibold hidden sm:inline">
              Chrome DevTools Viewport: {activeSpec.name}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] bg-slate-700 text-indigo-300 px-2 py-0.5 rounded font-mono">
              UA: {activeSpec.id === 'mobile' ? 'iPhone OS 13' : 'Blink Engine'}
            </span>
            <div className="flex items-center space-x-1 text-emerald-400 font-mono font-bold">
              <Camera className="w-3.5 h-3.5" />
              <span>Simulated Viewport</span>
            </div>
          </div>
        </div>

        {/* Viewport Frame Box with Centered Dimensions for Mobile Simulation */}
        <div className="p-2 sm:p-4 bg-slate-950 min-h-[600px] flex justify-center overflow-x-auto">
          <div
            className={`transition-all duration-300 bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-300 ${
              currentDevice === 'mobile'
                ? 'w-[375px] my-4 ring-8 ring-slate-800 rounded-[32px]'
                : currentDevice === 'tablet'
                ? 'w-[768px] my-4 ring-8 ring-slate-800 rounded-[24px]'
                : currentDevice === 'desktop'
                ? 'w-[1280px] my-2'
                : 'w-full'
            }`}
          >
            {/* Embedded Live React App Frame */}
            <div className="w-full h-full overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>

      {/* Question 2: Observed Layout & UI Differences Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Question 2 Answer Summary</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Observed Layout & UI Differences (Mobile vs Tablet & Desktop)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Comparing the React application rendering across simulated Chrome DevTools viewports (iPhone X 375px vs Tablet 768px vs Desktop 1280px):
          </p>
        </div>

        {/* Layout Differences Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LAYOUT_DIFFERENCES.map((diff, index) => {
            const IconComponent = getIcon(diff.icon);
            return (
              <div
                key={index}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-indigo-300 transition-colors space-y-3"
              >
                <div className="flex items-center space-x-2 text-indigo-600 font-bold text-sm">
                  <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span>{diff.feature}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                    <strong className="block text-[11px] uppercase tracking-wider text-amber-700 mb-0.5">
                      📱 Mobile Viewport (iPhone X 375px)
                    </strong>
                    {diff.mobileView}
                  </div>

                  <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-950">
                    <strong className="block text-[11px] uppercase tracking-wider text-indigo-700 mb-0.5">
                      💻 Tablet & Desktop Viewport (768px+)
                    </strong>
                    {diff.tabletDesktopView}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic pt-1">
                  <strong>User Impact:</strong> {diff.impact}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
