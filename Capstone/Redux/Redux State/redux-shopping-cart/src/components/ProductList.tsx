import React, { useState } from 'react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, Filter, Sparkles } from 'lucide-react';

export const ProductList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Audio', 'Wearables', 'Peripherals', 'Displays'];

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Category Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-xs border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="mr-1 h-4 w-4 text-slate-400" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:focus:bg-slate-800"
          />
        </div>
      </div>

      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Featured Products Catalog</span>
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {filteredProducts.length} Items
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click 'Add to Cart' or 'Remove' on any ProductCard to dispatch Redux actions directly to cartReducer.
          </p>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-800">
          <Sparkles className="h-8 w-8 text-slate-400" />
          <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            No products match your filter criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
