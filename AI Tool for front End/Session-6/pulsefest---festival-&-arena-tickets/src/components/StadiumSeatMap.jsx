import React from 'react';
import { TicketTier } from '../types';
import { Shield, Zap, Sparkles, Users } from 'lucide-react';

interface StadiumSeatMapProps {
  tiers: TicketTier[];
  selectedTier: TicketTier;
  onSelectTier: (tier: TicketTier) => void;
}

export const StadiumSeatMap: React.FC<StadiumSeatMapProps> = ({
  tiers,
  selectedTier,
  onSelectTier
}) => {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-yellow-400 tracking-wider uppercase bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
            ⚡ Stadium Arena Blueprint
          </span>
          <h3 className="text-xl font-bold text-white mt-1">Interactive Seat & Stage Zone Map</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live Arena Availability</span>
        </div>
      </div>

      {/* Visual Stadium Stage Floor Map */}
      <div className="relative bg-zinc-900/90 rounded-xl p-6 border border-zinc-800 flex flex-col items-center gap-4 overflow-hidden">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

        {/* MAIN STAGE LIGHTING TOP */}
        <div className="w-full max-w-md bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-black font-black text-center py-2.5 rounded-lg shadow-lg shadow-red-500/20 text-sm tracking-widest uppercase flex items-center justify-center gap-2 relative z-10">
          <Zap className="w-4 h-4 fill-current animate-bounce" />
          <span>MAIN STAGE & PYROTECHNICS ARENA</span>
          <Zap className="w-4 h-4 fill-current animate-bounce" />
        </div>

        {/* FAN PIT - CENTER STAGE */}
        {tiers.find(t => t.id === 'tier-fanpit') && (
          <button
            onClick={() => onSelectTier(tiers.find(t => t.id === 'tier-fanpit')!)}
            className={`w-full max-w-sm p-4 rounded-xl border transition-all duration-300 relative group text-center cursor-pointer ${
              selectedTier.id === 'tier-fanpit'
                ? 'bg-red-500/20 border-red-500 shadow-lg shadow-red-500/30 ring-2 ring-red-400'
                : 'bg-zinc-800/80 border-red-500/40 hover:bg-red-950/40 hover:border-red-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-red-400 mb-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> IPL FAN PIT (FRONT ROW)
              </span>
              <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-[10px]">
                ₹4,999
              </span>
            </div>
            <p className="text-xs text-zinc-300 font-medium">Confetti, Pyros & High-Energy Front Stage Standing</p>
          </button>
        )}

        {/* GOLD ZONE - MID FIELD */}
        {tiers.find(t => t.id === 'tier-gold') && (
          <button
            onClick={() => onSelectTier(tiers.find(t => t.id === 'tier-gold')!)}
            className={`w-full max-w-md p-4 rounded-xl border transition-all duration-300 text-center cursor-pointer ${
              selectedTier.id === 'tier-gold'
                ? 'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                : 'bg-zinc-800/80 border-amber-500/40 hover:bg-amber-950/40 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> GOLD ENCLOSURE (STAGE FRONT)
              </span>
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px]">
                ₹3,499
              </span>
            </div>
            <p className="text-xs text-zinc-300 font-medium">Fast Track Arena Access & LED Wristbands</p>
          </button>
        )}

        {/* GENERAL STAND - OUTER RING */}
        {tiers.find(t => t.id === 'tier-general') && (
          <button
            onClick={() => onSelectTier(tiers.find(t => t.id === 'tier-general')!)}
            className={`w-full p-4 rounded-xl border transition-all duration-300 text-center cursor-pointer ${
              selectedTier.id === 'tier-general'
                ? 'bg-zinc-700/50 border-zinc-400 shadow-lg ring-2 ring-zinc-300'
                : 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-zinc-300 mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-zinc-400" /> GENERAL STAND (EAST/WEST TIER)
              </span>
              <span className="bg-zinc-700 text-zinc-200 px-2 py-0.5 rounded text-[10px]">
                ₹1,999
              </span>
            </div>
            <p className="text-xs text-zinc-400">Panoramic High Stadium Screen View & Food Court Access</p>
          </button>
        )}

        {/* SKYBOX VIP LOUNGE */}
        {tiers.find(t => t.id === 'tier-skybox') && (
          <button
            onClick={() => onSelectTier(tiers.find(t => t.id === 'tier-skybox')!)}
            className={`w-full p-3.5 rounded-xl border transition-all duration-300 text-center cursor-pointer ${
              selectedTier.id === 'tier-skybox'
                ? 'bg-yellow-400/20 border-yellow-400 shadow-lg shadow-yellow-400/30 ring-2 ring-yellow-400'
                : 'bg-zinc-900 border-yellow-500/30 hover:bg-yellow-950/30 hover:border-yellow-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-yellow-400 mb-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> VIP SKYBOX CORPORATE LOUNGE (LEVEL 3)
              </span>
              <span className="bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded text-[10px]">
                ₹8,999
              </span>
            </div>
            <p className="text-xs text-zinc-300 font-medium">AC Suite, Gourmet Dining & Exclusive Artist Lounge Access</p>
          </button>
        )}
      </div>

      {/* Selected Tier Highlights */}
      <div className="mt-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs text-zinc-400">Selected Stadium Zone</p>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span>{selectedTier.name}</span>
            <span className="text-xs text-yellow-400 font-semibold bg-yellow-400/10 px-2 py-0.5 rounded">
              {selectedTier.stadiumZone}
            </span>
          </h4>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-400">Price per ticket</p>
          <p className="text-xl font-black text-amber-400">₹{selectedTier.price.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
};
