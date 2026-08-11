import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles, Zap, Smartphone, CheckCircle } from 'lucide-react';

interface HeroProps {
  highContrast: boolean;
  optimizedImages: boolean;
  onExploreAudits: () => void;
  onViewDeviceDiffs: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  highContrast,
  optimizedImages,
  onExploreAudits,
  onViewDeviceDiffs,
}) => {
  // WCAG compliant text color check
  const textColorClass = highContrast
    ? 'text-slate-900 font-bold'
    : 'text-slate-700';

  const headingClass = highContrast
    ? 'text-slate-950 font-black tracking-tight'
    : 'text-slate-900 font-extrabold tracking-tight';

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-900 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Tested on Chrome & Firefox Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl ${headingClass} leading-[1.15]`}>
              High-Performance <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Responsive React App
              </span>
            </h1>

            {/* Subheading */}
            <p className={`text-base sm:text-lg ${textColorClass} max-w-2xl leading-relaxed`}>
              Engineered with mobile-first Tailwind CSS breakpoints, WCAG AA high-contrast standards, and zero layout shift. Simulates Chrome DevTools mobile viewports, Lighthouse performance audits, and ChatGPT optimization strategies.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 pt-1">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>iPhone X (375px) Mobile Viewport</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Lighthouse Performance 98/100</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Chrome vs Firefox Parity Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>ChatGPT Recommended Fixes</span>
              </div>
            </div>

            {/* Action Buttons - Adaptive Layout: Full-width on mobile, Row on tablet/desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={onViewDeviceDiffs}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Smartphone className="w-4 h-4" />
                <span>Inspect Device Viewports</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onExploreAudits}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Run Lighthouse Audit</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Graphic Stage */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl p-2 sm:p-3">
              {/* DevTools Frame Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 rounded-lg text-[11px] text-slate-300 font-mono mb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-semibold text-slate-200">Chrome DevTools (iPhone X)</span>
                </div>
                <span className="text-emerald-400 font-bold">375 × 812 px</span>
              </div>

              {/* Responsive Hero Image with Explicit Width/Height for LCP optimization */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={
                    optimizedImages
                      ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
                      : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
                  }
                  alt="DevPulse Analytics & Performance Dashboard preview"
                  width="800"
                  height="500"
                  loading="eager"
                  className="w-full h-full object-cover rounded-xl transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-slate-700/80 text-white w-full">
                    <div className="flex justify-between items-center text-xs font-bold mb-1">
                      <span className="text-indigo-300">Lighthouse Health Status</span>
                      <span className="text-emerald-400">98 / 100</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[98%] transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl border border-slate-200 shadow-xl hidden sm:flex items-center space-x-3 text-xs font-bold text-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-900">WCAG AA Compliant</p>
                <p className="text-slate-500 font-normal">Contrast ratio &gt; 4.5:1</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
