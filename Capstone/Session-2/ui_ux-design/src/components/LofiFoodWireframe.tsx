import React, { useState } from 'react';
import { RESTAURANTS_DATA } from '../data/mockData';
import { OrderStatus } from '../types';
import { 
  Search, 
  MapPin, 
  Filter, 
  Clock, 
  Star, 
  Bike, 
  CheckCircle2, 
  Sparkles, 
  PenTool, 
  Layers,
  Info
} from 'lucide-react';

export const LofiFoodWireframe: React.FC = () => {
  const [sketchMode, setSketchMode] = useState<boolean>(true);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'home' | 'order-tracker'>('home');

  // Order tracking status simulation
  const [orderSteps, setOrderSteps] = useState<OrderStatus[]>([
    { step: 1, title: 'Order Confirmed', time: '12:40 PM', description: 'Restaurant accepted your order', isDone: true },
    { step: 2, title: 'Preparing Food', time: '12:45 PM', description: 'Chef is preparing your meal in kitchen', isDone: true },
    { step: 3, title: 'Delivery Partner Assigned', time: '12:50 PM', description: 'Ramesh is at the restaurant', isDone: true },
    { step: 4, title: 'Out for Delivery', time: '01:02 PM', description: 'On the way to your door (2.4 km away)', isDone: false },
    { step: 5, title: 'Order Delivered', time: 'Est. 01:15 PM', description: 'Enjoy your fresh hot meal!', isDone: false }
  ]);

  const advanceOrderStep = () => {
    setOrderSteps(prev => {
      const nextDoneIndex = prev.findIndex(s => !s.isDone);
      if (nextDoneIndex !== -1) {
        return prev.map((s, idx) => idx === nextDoneIndex ? { ...s, isDone: true } : s);
      }
      return prev;
    });
  };

  const resetOrderSteps = () => {
    setOrderSteps(prev => prev.map((s, idx) => ({ ...s, isDone: idx <= 1 })));
  };

  const filteredRestaurants = RESTAURANTS_DATA.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFilter === 'Rating 4.5+') return matchesSearch && r.rating >= 4.5;
    if (selectedFilter === 'Offers') return matchesSearch && r.offer.length > 0;
    if (selectedFilter === 'Fastest Delivery') return matchesSearch && r.deliveryTime.includes('20');
    return matchesSearch;
  });

  return (
    <div className={`p-4 md:p-6 min-h-screen transition-colors duration-300 ${
      sketchMode 
        ? 'bg-[#f8f6f0] text-stone-900 font-mono border-dashed' 
        : 'bg-slate-100 text-slate-800 font-sans'
    }`}>
      {/* Exercise Header & Toolbar */}
      <div className="max-w-6xl mx-auto mb-6 bg-white rounded-xl shadow-sm border border-stone-300 p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded bg-amber-100 text-amber-800 border border-amber-300">
              Exercise 1: Low-Fidelity Wireframe
            </span>
            <h1 className="text-xl font-bold">Food Delivery App Homepage (Zomato / Swiggy Style)</h1>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Focuses on structural layout, key components (Search, Featured Cards, Order Tracker), and content hierarchy before visual styling.
          </p>
        </div>

        {/* Wireframe Style Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSketchMode(!sketchMode)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all border ${
              sketchMode 
                ? 'bg-amber-600 text-white border-amber-700 shadow-sm' 
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            {sketchMode ? 'Hand-Drawn Sketch Mode' : 'Clean Digital Wireframe'}
          </button>

          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all border ${
              showAnnotations 
                ? 'bg-blue-600 text-white border-blue-700 shadow-sm' 
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            {showAnnotations ? 'UX Annotations ON' : 'UX Annotations OFF'}
          </button>
        </div>
      </div>

      {/* Main Wireframe Canvas Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Interactive Wireframe Phone / Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border-2 border-stone-800 p-4 md:p-6 shadow-md relative">
          
          {/* Wireframe Phone Frame Header */}
          <div className="border-b-2 border-stone-800 pb-3 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-stone-700" />
              <div>
                <span className="text-xs font-bold block text-stone-500 uppercase">Deliver To [LOCATION_SELECT]</span>
                <span className="text-sm font-bold border-b border-dashed border-stone-800">Koramangala 5th Block, Bengaluru ▼</span>
              </div>
            </div>
            
            <div className="flex gap-2 text-xs">
              <button 
                onClick={() => setActiveTab('home')}
                className={`px-3 py-1 rounded border-2 border-stone-800 font-bold transition-all ${
                  activeTab === 'home' ? 'bg-stone-800 text-white' : 'bg-stone-100 hover:bg-stone-200'
                }`}
              >
                [HOME_FEED]
              </button>
              <button 
                onClick={() => setActiveTab('order-tracker')}
                className={`px-3 py-1 rounded border-2 border-stone-800 font-bold flex items-center gap-1 transition-all ${
                  activeTab === 'order-tracker' ? 'bg-stone-800 text-white' : 'bg-stone-100 hover:bg-stone-200'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                [TRACKER]
              </button>
            </div>
          </div>

          {activeTab === 'home' ? (
            <div className="space-y-6">
              {/* Section 1: Search Bar Wireframe */}
              <div className="relative">
                {showAnnotations && (
                  <div className="absolute -top-3 left-4 bg-amber-200 text-amber-900 border border-amber-400 text-[10px] px-2 py-0.5 rounded font-sans font-bold z-10 shadow-xs">
                    ① Primary Search Anchor (Sticky Top)
                  </div>
                )}
                <div className="flex items-center border-2 border-stone-800 rounded-xl p-2.5 bg-stone-50 gap-2 shadow-xs">
                  <Search className="w-5 h-5 text-stone-600" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes, restaurants or cuisines... [INPUT_SEARCH]"
                    className="w-full bg-transparent border-none outline-none text-sm font-bold text-stone-900 placeholder:text-stone-400"
                  />
                  <button className="px-2.5 py-1 border border-stone-800 rounded bg-stone-200 text-xs font-bold hover:bg-stone-300">
                    [MIC]
                  </button>
                </div>
              </div>

              {/* Section 2: Quick Filter Chips */}
              <div className="relative">
                {showAnnotations && (
                  <div className="absolute -top-3 left-4 bg-amber-200 text-amber-900 border border-amber-400 text-[10px] px-2 py-0.5 rounded font-sans font-bold z-10 shadow-xs">
                    ② Quick Filter Chips (Horizontal Scroll Row)
                  </div>
                )}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
                  {['All', 'Rating 4.5+', 'Offers', 'Fastest Delivery'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-2 border-stone-800 transition-all ${
                        selectedFilter === filter 
                          ? 'bg-stone-900 text-white' 
                          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                      }`}
                    >
                      {filter === 'All' ? '[FILTER_ALL]' : `[${filter.toUpperCase()}]`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 3: Wireframe Banner Carousel Placeholder */}
              <div className="relative border-2 border-dashed border-stone-800 rounded-xl p-4 bg-stone-100 text-center">
                {showAnnotations && (
                  <div className="absolute top-2 left-2 bg-amber-200 text-amber-900 border border-amber-400 text-[10px] px-2 py-0.5 rounded font-sans font-bold z-10">
                    ③ Hero Offer Banner Placeholder
                  </div>
                )}
                <div className="py-4">
                  <span className="text-sm font-bold text-stone-700 block">[HERO_BANNER_CAROUSEL_BOX]</span>
                  <p className="text-xs text-stone-500 mt-1">
                    "Flat 50% OFF on First 3 Orders" • [PROMO_CODE: FIRST50]
                  </p>
                  <div className="flex justify-center gap-1.5 mt-3">
                    <span className="w-2 h-2 rounded-full bg-stone-800"></span>
                    <span className="w-2 h-2 rounded-full bg-stone-300"></span>
                    <span className="w-2 h-2 rounded-full bg-stone-300"></span>
                  </div>
                </div>
              </div>

              {/* Section 4: Featured Restaurants Grid */}
              <div className="relative space-y-4">
                {showAnnotations && (
                  <div className="absolute -top-3 left-4 bg-amber-200 text-amber-900 border border-amber-400 text-[10px] px-2 py-0.5 rounded font-sans font-bold z-10 shadow-xs">
                    ④ Featured Restaurants Card Feed
                  </div>
                )}
                <div className="flex justify-between items-center pt-2">
                  <h3 className="font-bold text-base uppercase border-b-2 border-stone-800 pb-0.5">
                    [SECTION_TITLE: Featured Restaurants]
                  </h3>
                  <span className="text-xs font-bold text-stone-500">
                    Showing {filteredRestaurants.length} items
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRestaurants.map(restaurant => (
                    <div 
                      key={restaurant.id}
                      className="border-2 border-stone-800 rounded-xl p-3 bg-stone-50 hover:bg-amber-50/50 transition-all flex flex-col justify-between group"
                    >
                      {/* Image Box Placeholder */}
                      <div className="h-32 border-2 border-dashed border-stone-700 rounded-lg bg-stone-200 flex flex-col items-center justify-center relative overflow-hidden">
                        <span className="text-xs font-bold text-stone-600">{restaurant.wireframeTag}</span>
                        <span className="text-[10px] text-stone-500 mt-1">[IMAGE_PLACEHOLDER_4:3]</span>
                        {restaurant.offer && (
                          <span className="absolute bottom-2 left-2 bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {restaurant.offer}
                          </span>
                        )}
                        {restaurant.isPromoted && (
                          <span className="absolute top-2 right-2 bg-stone-300 border border-stone-800 text-stone-900 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            AD
                          </span>
                        )}
                      </div>

                      {/* Content Box */}
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-stone-900 group-hover:underline">
                            {restaurant.name}
                          </h4>
                          <span className="text-xs font-bold bg-emerald-100 border border-emerald-800 text-emerald-900 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-emerald-800" /> {restaurant.rating}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 truncate">{restaurant.cuisine}</p>
                        <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-dashed border-stone-300">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {restaurant.deliveryTime}
                          </span>
                          <span>{restaurant.priceForTwo}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* Order Tracking Wireframe View */
            <div className="space-y-6">
              <div className="relative border-2 border-stone-800 rounded-xl p-4 bg-stone-50">
                {showAnnotations && (
                  <div className="absolute -top-3 left-4 bg-amber-200 text-amber-900 border border-amber-400 text-[10px] px-2 py-0.5 rounded font-sans font-bold z-10 shadow-xs">
                    ⑤ Live Order Status Stepper Wireframe
                  </div>
                )}
                
                <div className="flex items-center justify-between pb-3 border-b-2 border-stone-800">
                  <div>
                    <span className="text-xs font-bold text-stone-500 uppercase block">[ORDER_ID: #ZM-9842]</span>
                    <h3 className="font-bold text-lg text-stone-900">Truffles Bistro • 3 Items</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">ESTIMATED DELIVERY</span>
                    <span className="text-sm font-bold text-emerald-700">12-15 Mins</span>
                  </div>
                </div>

                {/* Progress Stepper List */}
                <div className="mt-6 space-y-4">
                  {orderSteps.map((step, idx) => (
                    <div key={step.step} className="flex items-start gap-3 relative">
                      {idx < orderSteps.length - 1 && (
                        <div className={`absolute left-3.5 top-8 w-0.5 h-10 border-l-2 ${
                          step.isDone && orderSteps[idx+1].isDone ? 'border-stone-900' : 'border-dashed border-stone-400'
                        }`} />
                      )}

                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 border-stone-800 z-10 ${
                        step.isDone ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {step.isDone ? <CheckCircle2 className="w-4 h-4" /> : step.step}
                      </div>

                      <div className="flex-1 bg-white border border-stone-300 rounded-lg p-2.5">
                        <div className="flex justify-between items-center">
                          <h4 className={`text-xs font-bold ${step.isDone ? 'text-stone-900' : 'text-stone-500'}`}>
                            {step.title}
                          </h4>
                          <span className="text-[10px] text-stone-400">{step.time}</span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulation Control Buttons */}
                <div className="mt-6 pt-4 border-t-2 border-stone-800 flex justify-between gap-2">
                  <button 
                    onClick={advanceOrderStep}
                    className="flex-1 py-2 bg-stone-900 text-white rounded-lg text-xs font-bold border border-stone-900 hover:bg-stone-800"
                  >
                    Simulate Next Order Status →
                  </button>
                  <button 
                    onClick={resetOrderSteps}
                    className="px-3 py-2 bg-stone-200 text-stone-800 rounded-lg text-xs font-bold border border-stone-400 hover:bg-stone-300"
                  >
                    Reset Order
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Right Side: UX Design Rationale & Specifications (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-stone-300 p-4 shadow-sm space-y-3 font-sans">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-600" /> UX Architecture Rationale
            </h3>
            
            <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
              <div className="p-2.5 rounded bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-900 block">Fitts's Law & Search Positioning:</span>
                The search bar is pinned at the top thumb zone with high-contrast borders for instant recall.
              </div>

              <div className="p-2.5 rounded bg-blue-50 border border-blue-200">
                <span className="font-bold text-blue-900 block">Progressive Disclosure:</span>
                Filters are presented as single-row scrollable chips rather than complex drop-down modals to reduce cognitive load.
              </div>

              <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900 block">Scannable Card Hierarchy:</span>
                Image box placeholder → Restaurant Name → Rating Pill → Delivery ETA → Offer badge.
              </div>
            </div>
          </div>

          {/* Wireframe Checklist */}
          <div className="bg-white rounded-xl border border-stone-300 p-4 shadow-sm space-y-2 font-sans">
            <h4 className="text-xs font-bold uppercase text-stone-500">Exercise Requirements Met</h4>
            <ul className="text-xs space-y-1.5 text-stone-800">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">✓</span>
                Low-Fidelity Food Delivery Homepage
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">✓</span>
                Search bar & filters included
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">✓</span>
                Featured restaurants layout grid
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">✓</span>
                Interactive live order tracking section
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
