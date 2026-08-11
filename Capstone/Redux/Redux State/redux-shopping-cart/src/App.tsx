import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Navbar } from './components/Navbar';
import { ProductList } from './components/ProductList';
import { OffersBanner } from './components/OffersBanner';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { DevToolsPanel } from './components/DevToolsPanel';
import { ReduxArchitectureGuide } from './components/ReduxArchitectureGuide';
import { BookOpen, Cpu, Sparkles, Layers } from 'lucide-react';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(true); // Open by default for easy DevTools inspection!
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100 font-sans pb-24">
        {/* Navigation Bar */}
        <Navbar
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onToggleDevTools={() => setIsDevToolsOpen(!isDevToolsOpen)}
          onOpenGuide={() => setIsGuideOpen(true)}
          isDevToolsOpen={isDevToolsOpen}
        />

        {/* Main Content Area */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Quick Requirement Callout Banner */}
          <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-indigo-100 bg-linear-to-r from-indigo-50 via-purple-50 to-white p-4 dark:border-indigo-900/50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                  Complete Redux Store & Redux-Thunk Demo
                </h2>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">cartReducer</span> + <span className="font-semibold text-rose-600 dark:text-rose-400">wishlistReducer</span> via <code className="font-mono text-xs">combineReducers</code> • <code className="font-mono text-xs">redux-thunk</code> • Redux DevTools
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsGuideOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-all shrink-0"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Verify 5 Steps</span>
              </button>

              <button
                onClick={() => setIsDevToolsOpen(!isDevToolsOpen)}
                className="flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-bold text-purple-700 hover:bg-purple-100 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-300 shrink-0"
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>{isDevToolsOpen ? 'Hide DevTools' : 'Open DevTools'}</span>
              </button>
            </div>
          </section>

          {/* Requirement 4: Redux-Thunk Offers Banner */}
          <section>
            <OffersBanner />
          </section>

          {/* Requirement 1 & 2: Product Catalog Grid with ProductCard dispatching addToCart and removeFromCart */}
          <section>
            <ProductList />
          </section>
        </main>

        {/* Requirement 1: Shopping Cart Slide-over */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />

        {/* Requirement 3: Wishlist Slide-over */}
        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
        />

        {/* Requirement 5: Redux DevTools Extension & Interactive Inspector */}
        <DevToolsPanel
          isOpen={isDevToolsOpen}
          onClose={() => setIsDevToolsOpen(false)}
        />

        {/* Architectural Verification Modal */}
        <ReduxArchitectureGuide
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
        />
      </div>
    </Provider>
  );
}
