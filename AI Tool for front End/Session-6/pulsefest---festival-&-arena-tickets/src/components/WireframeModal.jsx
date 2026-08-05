import React from 'react';
import { X, Layout, Layers, Sparkles, CheckCircle, ExternalLink } from 'lucide-react';

interface WireframeModalProps {
  onClose: () => void;
}

export const WireframeModal: React.FC<WireframeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl my-8 overflow-hidden text-zinc-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl">
              <Layout className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                AI Wireframe Spec • Figma AI / Uizard Export
              </span>
              <h2 className="text-xl font-black text-white">festival-landing-wireframe.png Blueprint</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Image Container */}
          <div className="relative rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900 group">
            <img
              src="/festival-landing-wireframe.png"
              alt="Festival Landing Wireframe Export"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[500px] object-cover rounded-xl"
            />
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Generated & Exported to festival-landing-wireframe.png
            </div>
          </div>

          {/* Wireframe Architecture Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" /> 1. Hero Grid & IPL Hype
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                12-column responsive layout showcasing the full crowd backdrop (`hero-image.png`), matchday roar indicators, countdown timers, and quick ticket drawer.
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> 2. BookMyShow Discovery
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                Filter by city, music genres (EDM, Bollywood, Rock, Hip-Hop), live pricing tiers, and stadium capacity seat maps.
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-cyan-400" /> 3. Ticket Pass Checkout
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                Seamless modal workflow for selecting General Stand, Gold Enclosure, Fan Pit, or VIP Skybox with instant digital QR pass issuance.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-900/80 border-t border-zinc-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Close Wireframe Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
