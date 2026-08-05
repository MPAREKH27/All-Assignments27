import React, { useState, useEffect } from 'react';
import { Utensils, Search, Star, Clock, Sparkles, Code2, Copy, Check, RefreshCw, Filter, Layers, ArrowRight } from 'lucide-react';
import { ZOMATO_RESTAURANTS } from '../data/sampleData';
import { Restaurant } from '../types';
import { CodeViewer } from './CodeViewer';

/**
 * Custom Hook: useRestaurants
 * Handles simulated API fetching, loading states, error handling, and search filtering
 */
export function useRestaurants(initialCity = 'New Delhi', minRatingFilter = 0) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network request delay
      await new Promise(resolve => setTimeout(resolve, 600));
      setRestaurants(ZOMATO_RESTAURANTS);
    } catch (err) {
      setError('Failed to fetch restaurant listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [initialCity]);

  // Derived filtered listings
  const filteredRestaurants = restaurants.filter(r => {
    const matchesQuery = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = r.rating >= minRatingFilter;
    return matchesQuery && matchesRating;
  });

  return {
    restaurants: filteredRestaurants,
    rawCount: restaurants.length,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    refetch: fetchRestaurants
  };
}

export const Exercise3ZomatoListing: React.FC = () => {
  const [minRating, setMinRating] = useState<number>(0);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [viewArchitecture, setViewArchitecture] = useState<'after' | 'before'>('after');

  const { restaurants, loading, error, searchQuery, setSearchQuery, refetch } = useRestaurants('New Delhi', minRating);

  const promptText = `Act as a Senior React Engineer. Refactor my monolithic React component for a Zomato restaurant listing page to extract all data-fetching, loading states, error handling, and search filtering logic into a custom reusable React hook named \`useRestaurants\`.

--- REQUIREMENTS FOR THE HOOK (\`useRestaurants.js\`) ---
1. Encapsulate state for \`restaurants\`, \`loading\`, \`error\`, and \`searchQuery\`.
2. Return an object containing: \`{ restaurants, loading, error, searchQuery, setSearchQuery, refetch }\`.
3. Support async data fetching with try/catch/finally and proper cleanups.
4. Support instant search/cuisine filter over the restaurant collection.

--- REQUIREMENTS FOR THE UI COMPONENT (\`ZomatoListing.jsx\`) ---
1. Must consume the \`useRestaurants\` custom hook.
2. Render a search bar, rating filter pills, and Zomato-style restaurant cards displaying: restaurant image, name, cuisines, rating badge, price for two, delivery time in minutes, and promo offer tag.
3. Handle loading skeletons and error states cleanly.

Here is my current monolithic code to refactor:
[Paste your monolithic code here]`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const useRestaurantsHookCode = `// useRestaurants.js - Custom Reusable Hook for Zomato Data Fetching
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom Hook for fetching and filtering restaurant listings.
 * 
 * @param {string} initialCity - Default location parameter
 * @param {number} minRating - Minimum rating threshold for filtering
 * @returns {Object} { restaurants, loading, error, searchQuery, setSearchQuery, refetch }
 */
export function useRestaurants(initialCity = 'Delhi NCR', minRating = 0) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    
    try {
      // Replace with your real API endpoint e.g., fetch('/api/zomato/restaurants')
      const response = await fetch(\`/api/restaurants?city=\${encodeURIComponent(initialCity)}\`, {
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(\`Server returned status \${response.status}\`);
      }

      const data = await response.json();
      setRestaurants(data.restaurants || []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to load restaurant listings');
      }
    } finally {
      setLoading(false);
    }
  }, [initialCity]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  // Derived filtered list
  const filteredRestaurants = restaurants.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.cuisine.some(c => c.toLowerCase().includes(query)) ||
      item.location.toLowerCase().includes(query);
    
    const matchesRating = item.rating >= minRating;
    return matchesSearch && matchesRating;
  });

  return {
    restaurants: filteredRestaurants,
    totalCount: restaurants.length,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    refetch: fetchRestaurants
  };
}

export default useRestaurants;`;

  const zomatoListingJSX = `// ZomatoListing.jsx - Clean Refactored UI Component
import React from 'react';
import { useRestaurants } from './useRestaurants';

export function ZomatoListing() {
  const { restaurants, loading, error, searchQuery, setSearchQuery, refetch } = useRestaurants('Delhi NCR', 0);

  if (error) {
    return (
      <div className="error-container p-4 bg-rose-500/10 text-rose-300 rounded-xl text-center">
        <p>{error}</p>
        <button onClick={refetch} className="mt-2 bg-rose-600 text-white px-4 py-1.5 rounded-lg">
          Retry Fetching
        </button>
      </div>
    );
  }

  return (
    <div className="zomato-container space-y-6">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for restaurant, cuisine or dish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-xl border border-slate-700 text-slate-100"
        />
      </div>

      {/* Loading Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-64 bg-slate-800/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        /* Restaurant Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurants.map((res) => (
            <div key={res.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                <img src={res.imageUrl} alt={res.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  {res.offer}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-100">{res.name}</h3>
                  <p className="text-xs text-slate-400">{res.cuisine.join(', ')}</p>
                </div>
                <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  {res.rating} ★
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-800 mt-3 pt-2">
                <span>{res.deliveryTimeMinutes} mins delivery</span>
                <span>₹{res.priceForTwo} for two</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ZomatoListing;`;

  return (
    <div className="space-y-8 pb-12">
      {/* Exercise Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Utensils className="w-3.5 h-3.5" />
              Task 3 of 5
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              Zomato Restaurant Listing Custom Hook Prompt & Refactoring
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Write a prompt for ChatGPT to refactor a Zomato restaurant listing component into a custom reusable hook <code className="text-rose-300 bg-slate-800 px-1.5 py-0.5 rounded">useRestaurants</code> for data fetching, loading states, and search filtering.
            </p>
          </div>
        </div>
      </div>

      {/* ChatGPT Prompt Generator Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-bold text-slate-100">
              The ChatGPT Prompt to Request Reusable Custom Hook Refactoring
            </h3>
          </div>

          <button
            onClick={copyPrompt}
            className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-lg"
          >
            {copiedPrompt ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            {copiedPrompt ? 'Prompt Copied!' : 'Copy Prompt for ChatGPT'}
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 text-xs font-mono leading-relaxed relative">
          <pre className="whitespace-pre-wrap font-mono text-slate-300">
            {promptText}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Live UI Render Driven by Custom Hook */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-rose-500" />
                <h3 className="text-lg font-bold text-slate-100">
                  Live Zomato Restaurant Listing
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={refetch}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 transition"
                  title="Refetch data via custom hook"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-rose-400' : ''}`} />
                  Refetch
                </button>
              </div>
            </div>

            {/* Filter Bar & Controls */}
            <div className="space-y-3 mb-6">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for restaurants, cuisines (e.g. Biryani, Burger)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500 transition"
                />
              </div>

              {/* Rating filter pills */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-rose-400" /> Rating Filter:
                </span>
                {[0, 4.0, 4.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition text-[11px] border ${
                      minRating === rate
                        ? 'bg-rose-500 text-white border-rose-400 shadow'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {rate === 0 ? 'All Ratings' : `${rate}+ ★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Listings Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 animate-pulse space-y-3">
                    <div className="w-full aspect-video bg-slate-800/60 rounded-xl" />
                    <div className="h-4 bg-slate-800/80 rounded w-3/4" />
                    <div className="h-3 bg-slate-800/50 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl text-center text-rose-300 text-xs">
                {error}
              </div>
            ) : restaurants.length === 0 ? (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
                No restaurants matched "{searchQuery}"
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {restaurants.map((res) => (
                  <div
                    key={res.id}
                    className="bg-slate-950 border border-slate-800/80 rounded-2xl p-3.5 shadow-lg hover:border-slate-700 transition flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-3 bg-slate-900">
                        <img
                          src={res.imageUrl}
                          alt={res.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          {res.offer}
                        </span>
                      </div>

                      {/* Header */}
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-sm text-slate-100 group-hover:text-rose-400 transition">
                          {res.name}
                        </h4>
                        <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0">
                          <span>{res.rating}</span>
                          <Star className="w-3 h-3 fill-current" />
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {res.cuisine.join(', ')}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {res.location}
                      </p>
                    </div>

                    {/* Footer stats */}
                    <div className="pt-2.5 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Clock className="w-3 h-3 text-rose-400" /> {res.deliveryTimeMinutes} mins
                      </span>
                      <span>₹{res.priceForTwo} for two</span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Refactoring Architecture Explained */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-cyan-400" />
              Why Refactor into Custom Hook `useRestaurants`?
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-cyan-400 block font-sans">1. Clean Separation of Concerns</strong>
                <p className="text-slate-400">
                  Data-fetching algorithms, AbortControllers, and filter logic belong in hooks, leaving the JSX view component light, presentational, and easily testable.
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-cyan-400 block font-sans">2. Reusability Across Multiple Views</strong>
                <p className="text-slate-400">
                  The same <code className="text-rose-300">useRestaurants</code> hook can power search dropdowns, map views, or mobile drawer lists without repeating code.
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-cyan-400 block font-sans">3. Simplified Unit Testing</strong>
                <p className="text-slate-400">
                  React hooks can be tested independently using <code className="text-amber-300">@testing-library/react-hooks</code> without mounting heavy UI components.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Code Viewers */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-rose-400" />
          Task 3 Full Code Files (`useRestaurants.js` & `ZomatoListing.jsx`)
        </h3>
        <CodeViewer
          filename="useRestaurants.js"
          jsxCode={useRestaurantsHookCode}
          jsCode={useRestaurantsHookCode}
          description="Custom React Hook for fetching Zomato restaurant data"
        />
        <CodeViewer
          filename="ZomatoListing.jsx"
          jsxCode={zomatoListingJSX}
          jsCode={zomatoListingJSX}
          description="React component consuming useRestaurants hook"
        />
      </div>
    </div>
  );
};
