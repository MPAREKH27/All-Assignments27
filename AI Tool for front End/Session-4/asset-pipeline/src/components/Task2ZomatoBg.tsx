import React, { useState } from 'react';
import { FOOD_APP_DATA } from '../data';
import { Search, MapPin, Star, Flame, Clock, Heart, Sliders, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const Task2ZomatoBg: React.FC = () => {
  const [overlayOpacity, setOverlayOpacity] = useState<number>(60);
  const [showRawBg, setShowRawBg] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Biryani', 'Pizza', 'Burgers', 'North Indian', 'Chinese', 'Desserts'];

  const restaurants = [
    {
      name: 'The Grand Cafe & Bistro',
      cuisine: 'Modern European, Gourmet Cafe',
      rating: 4.8,
      time: '25-30 min',
      offer: '50% OFF up to ₹100',
      price: '₹350 for one',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Royal Biryani House',
      cuisine: 'Hyderabadi Biryani, Kebabs',
      rating: 4.6,
      time: '30-35 min',
      offer: 'Flat ₹125 OFF',
      price: '₹400 for one',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Artisan Pizza Lab',
      cuisine: 'Woodfired Italian Pizza, Pasta',
      rating: 4.7,
      time: '20-25 min',
      offer: 'Free Dessert on ₹499',
      price: '₹300 for one',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Info Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-rose-400 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Task 2 • Zomato-Style Food App Homepage</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Generated Hero & Ambient Background</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Engineered with specific parameters for <strong className="text-slate-200">Mood</strong> (Energetic Cafe Vibe), <strong className="text-slate-200">Lighting</strong> (Warm Bokeh Spotlights), and <strong className="text-slate-200">Color Palette</strong> (Zomato Crimson & Saffron Amber).
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowRawBg(!showRawBg)}
              className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors shadow-lg shadow-rose-600/20"
            >
              <Eye className="w-4 h-4" />
              <span>{showRawBg ? 'View Live Homepage UI' : 'Inspect Raw Background Image'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <Sliders className="w-4 h-4 text-rose-400" />
          <span className="font-semibold text-slate-300">Dark Overlay Opacity:</span>
          <input
            type="range"
            min="0"
            max="90"
            value={overlayOpacity}
            onChange={(e) => setOverlayOpacity(Number(e.target.value))}
            className="w-32 accent-rose-500 cursor-pointer"
          />
          <span className="font-mono text-rose-400 font-bold">{overlayOpacity}%</span>
        </div>

        <div className="flex items-center space-x-4 text-slate-400">
          <span>WebP Asset: <strong className="text-slate-200">{FOOD_APP_DATA.webpSize}</strong></span>
          <span>Aspect Ratio: <strong className="text-slate-200">{FOOD_APP_DATA.aspectRatio}</strong></span>
        </div>
      </div>

      {/* Main Container: Raw Image vs Live UI */}
      {showRawBg ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="relative rounded-xl overflow-hidden border border-slate-800">
            <img
              src={FOOD_APP_DATA.bgWebpUrl}
              alt="Raw Zomato-Style Background"
              referrerPolicy="no-referrer"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
              <span className="text-rose-400 font-bold uppercase tracking-wider block mb-1">
                Prompt Definition
              </span>
              "{FOOD_APP_DATA.prompt}"
            </div>
          </div>
        </div>
      ) : (
        /* Live Zomato Homepage Mock */
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src={FOOD_APP_DATA.bgWebpUrl}
              alt="Zomato App Background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform scale-105"
            />
            {/* Dynamic Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950 transition-opacity duration-300"
              style={{ opacity: overlayOpacity / 100 }}
            />
          </div>

          {/* Interactive UI Overlay Content */}
          <div className="relative z-10 p-6 md:p-10 space-y-8 max-w-5xl mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <div className="bg-rose-600 px-3 py-1 rounded-xl font-extrabold text-lg tracking-wider italic shadow-lg shadow-rose-600/40">
                  zomato
                </div>
                <div className="flex items-center text-xs text-slate-300 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1.5" />
                  <span className="font-medium">Connaught Place, New Delhi</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-full border border-white/10 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center font-bold text-xs text-white shadow-md">
                  M
                </div>
              </div>
            </div>

            {/* Hero Headline & Search Bar */}
            <div className="text-center space-y-4 py-4">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                Discover the best food & drinks
              </h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto font-medium">
                Craving gourmet pizzas, sizzling biryanis, or specialty coffee?
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative mt-4">
                <div className="flex items-center bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/40">
                  <Search className="w-5 h-5 text-slate-400 ml-3" />
                  <input
                    type="text"
                    placeholder="Search for restaurant, cuisine or a dish..."
                    className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
                  />
                  <button className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-md">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Food Categories Horizontal Scroll */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center">
                  <Flame className="w-4 h-4 text-amber-400 mr-1.5" /> Popular Categories
                </h3>
                <span className="text-xs text-rose-400 hover:underline cursor-pointer">View all</span>
              </div>
              <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/10 backdrop-blur-md'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Restaurant Cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white tracking-tight">Top Dining & Delivery Places</h3>
                <span className="text-xs text-slate-400 flex items-center hover:text-white cursor-pointer">
                  See more <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {restaurants.map((res, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl"
                  >
                    <div className="relative h-36">
                      <img
                        src={res.image}
                        alt={res.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                        {res.offer}
                      </div>
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center">
                        {res.rating} <Star className="w-2.5 h-2.5 ml-0.5 fill-white" />
                      </div>
                    </div>
                    <div className="p-3.5 space-y-1">
                      <h4 className="text-sm font-bold text-white truncate">{res.name}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{res.cuisine}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-slate-800">
                        <span className="flex items-center text-slate-400">
                          <Clock className="w-3 h-3 mr-1 text-slate-500" /> {res.time}
                        </span>
                        <span className="font-semibold text-rose-400">{res.price}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompt Specification Breakdown Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center">
          <Sparkles className="w-4 h-4 text-rose-400 mr-2" />
          Prompt Engineering Specification Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-rose-400 font-bold uppercase block mb-1">1. Mood</span>
            <p className="text-slate-300 font-medium">{FOOD_APP_DATA.specs.mood}</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold uppercase block mb-1">2. Lighting</span>
            <p className="text-slate-300 font-medium">{FOOD_APP_DATA.specs.lighting}</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold uppercase block mb-1">3. Color Palette</span>
            <p className="text-slate-300 font-medium">{FOOD_APP_DATA.specs.colorPalette}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
