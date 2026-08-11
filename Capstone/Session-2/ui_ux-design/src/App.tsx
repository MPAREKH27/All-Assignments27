import React, { useState } from 'react';
import { AssignmentTab } from './types';
import { LofiFoodWireframe } from './components/LofiFoodWireframe';
import { HifiMusicDashboard } from './components/HifiMusicDashboard';
import { MovieUserJourney } from './components/MovieUserJourney';
import { UizardCartDashboard } from './components/UizardCartDashboard';
import { FigmaCredTransformer } from './components/FigmaCredTransformer';
import { DesignSpecDrawer } from './components/DesignSpecDrawer';
import { 
  PenTool, 
  Music, 
  Film, 
  ShoppingBag, 
  Wand2, 
  BookOpen, 
  Sparkles, 
  Layout, 
  Layers
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AssignmentTab>('food-lofi');
  const [showSpecDrawer, setShowSpecDrawer] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Studio Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 font-black">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-base md:text-lg text-white tracking-wide">
                  UI/UX Design Studio
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  5 Exercises
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Interactive wireframes, Spotify Hi-Fi prototype, BookMyShow user journey, Flipkart cart & CRED Figma AI transformer.
              </p>
            </div>
          </div>

          {/* Exercise Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            
            <button
              onClick={() => setActiveTab('food-lofi')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                activeTab === 'food-lofi'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>1. Food Lo-Fi</span>
            </button>

            <button
              onClick={() => setActiveTab('music-hifi')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                activeTab === 'music-hifi'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>2. Spotify Hi-Fi</span>
            </button>

            <button
              onClick={() => setActiveTab('movie-journey')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                activeTab === 'movie-journey'
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>3. BMS Journey</span>
            </button>

            <button
              onClick={() => setActiveTab('cart-uizard')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                activeTab === 'cart-uizard'
                  ? 'bg-blue-500 text-white border-blue-400 shadow-md shadow-blue-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>4. Flipkart Cart</span>
            </button>

            <button
              onClick={() => setActiveTab('cred-transform')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                activeTab === 'cred-transform'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-300" />
              <span>5. CRED Figma AI</span>
            </button>

            {/* Spec Drawer Toggle Button */}
            <button
              onClick={() => setShowSpecDrawer(!showSpecDrawer)}
              className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 font-bold text-xs flex items-center gap-1.5 ml-2"
              title="UX Evaluation & Design Specs"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">UX Specs</span>
            </button>

          </div>

        </div>
      </header>

      Main Content Area *
      <main className="flex-1">
        {activeTab === 'food-lofi' && <LofiFoodWireframe />}
        {activeTab === 'music-hifi' && <HifiMusicDashboard />}
        {activeTab === 'movie-journey' && <MovieUserJourney />}
        {activeTab === 'cart-uizard' && <UizardCartDashboard />}
        {activeTab === 'cred-transform' && <FigmaCredTransformer />}
      </main>

      {/* Design Specs Overlay Drawer */}
      {showSpecDrawer && (
        <DesignSpecDrawer
          activeTab={activeTab}
          onClose={() => setShowSpecDrawer(false)}
        />
      )}

    </div>
  );
}
