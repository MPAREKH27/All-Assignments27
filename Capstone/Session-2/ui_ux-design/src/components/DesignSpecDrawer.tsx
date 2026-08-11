import React from 'react';
import { AssignmentTab } from '../types';
import { BookOpen, CheckCircle, PenTool, Layout, Layers, ShieldCheck, Sparkles } from 'lucide-react';

interface Props {
  activeTab: AssignmentTab;
  onClose: () => void;
}

export const DesignSpecDrawer: React.FC<Props> = ({ activeTab, onClose }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-zinc-900 border-l border-zinc-800 text-zinc-100 p-6 shadow-2xl z-50 overflow-y-auto space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="font-extrabold text-base text-white">UX Evaluation & Specs</h2>
        </div>
        <button onClick={onClose} className="text-zinc-400 hover:text-white font-bold text-sm">
          ✕
        </button>
      </div>

      {activeTab === 'food-lofi' && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-amber-400 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <PenTool className="w-4 h-4" /> Exercise 1: Food Delivery Wireframe Evaluation
          </h3>
          <div className="space-y-2 text-zinc-300">
            <p className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700">
              <strong>Objective:</strong> Abstract away color/images to evaluate spatial layout, thumb-zone placement for search, and progress stepper legibility.
            </p>
            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700 space-y-1">
              <strong className="text-white block">Key Design Metrics:</strong>
              <ul className="list-disc list-inside space-y-0.5 text-zinc-400">
                <li>Search Bar height: 48px min touch target</li>
                <li>Grid: 2-column card layout with 16px gap</li>
                <li>Tracking Stepper: Vertical status timeline with status indicators</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'music-hifi' && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-emerald-400 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <Layout className="w-4 h-4" /> Exercise 2: Spotify Music Dashboard Specs
          </h3>
          <div className="space-y-2 text-zinc-300">
            <p className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700">
              <strong>Objective:</strong> High-fidelity dark mode dashboard featuring glassmorphism, responsive track lists, profile badges, and interactive audio playback.
            </p>
            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700 space-y-1">
              <strong className="text-white block">Figma Specs:</strong>
              <ul className="list-disc list-inside space-y-0.5 text-zinc-400">
                <li>Primary Color: #1DB954 (Spotify Green)</li>
                <li>Canvas Background: #000000 & #121212</li>
                <li>Table Row Hover: rgba(255,255,255,0.08)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'movie-journey' && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-rose-400 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Exercise 3: BookMyShow User Journey Specs
          </h3>
          <div className="space-y-2 text-zinc-300">
            <p className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700">
              <strong>Objective:</strong> Map end-to-end user journey across 6 key stages with interactive seat selection, snack add-ons, and downloadable QR M-Ticket.
            </p>
            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700 space-y-1">
              <strong className="text-white block">6 Key Stages:</strong>
              <ol className="list-decimal list-inside space-y-0.5 text-zinc-400">
                <li>Discovery & App Launch</li>
                <li>Movie & Showtime Selection</li>
                <li>Theatre Seat Matrix Picker</li>
                <li>Popcorn & Beverages Add-ons</li>
                <li>Express UPI Payment Gateway</li>
                <li>Ticket Confirmation & Gate QR</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cart-uizard' && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-blue-400 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Exercise 4: Flipkart Cart Hierarchy Specs
          </h3>
          <div className="space-y-2 text-zinc-300">
            <p className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700">
              <strong>Objective:</strong> Uizard-style layout hierarchy analysis emphasizing primary checkout CTAs (#FB641B) vs secondary item controls.
            </p>
            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700 space-y-1">
              <strong className="text-white block">Visual Hierarchy Rules:</strong>
              <ul className="list-disc list-inside space-y-0.5 text-zinc-400">
                <li>Primary CTA: Flipkart Orange #FB641B</li>
                <li>Discount Tags: Emerald #10B981</li>
                <li>SuperCoins Accent: Amber #F59E0B</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cred-transform' && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-purple-400 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Exercise 5: Figma AI Design Transformer Specs
          </h3>
          <div className="space-y-2 text-zinc-300">
            <p className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700">
              <strong>Objective:</strong> Generate Job Profile layout from prompt, then apply Figma AI design token remapping to transform it into a CRED dark neon rewards dashboard.
            </p>
            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700 space-y-1">
              <strong className="text-white block">Remapping Transformations:</strong>
              <ul className="list-disc list-inside space-y-0.5 text-zinc-400">
                <li>Corporate Light → Dark Luxury #0B0B0D</li>
                <li>Skills → CRED Coins & Credit Score</li>
                <li>Projects → Exclusive Member Brand Perks</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-zinc-800 text-[11px] text-zinc-500">
        All 5 UI/UX design exercises are fully interactive with live state management and design rationale documentation.
      </div>
    </div>
  );
};
