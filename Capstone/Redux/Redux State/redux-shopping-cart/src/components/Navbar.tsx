import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  ShoppingBag,
  Heart,
  Cpu,
  BookOpen,
  Sparkles,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onToggleDevTools: () => void;
  onOpenGuide: () => void;
  isDevToolsOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenWishlist,
  onToggleDevTools,
  onOpenGuide,
  isDevToolsOpen,
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const offersCount = useSelector((state: RootState) => state.offers.items.length);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-tr from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                Redux Shopping Store
              </h1>
              <span className="hidden rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 sm:inline-block dark:bg-indigo-950 dark:text-indigo-300">
                Redux + Thunk + DevTools
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Complete Redux Architecture Demonstration
            </p>
          </div>
        </div>

        {/* Header Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Step Guide Modal Trigger */}
          <button
            onClick={onOpenGuide}
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <BookOpen className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Redux Architecture Guide</span>
          </button>

          {/* DevTools Inspector Button */}
          <button
            onClick={onToggleDevTools}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all shadow-xs ${
              isDevToolsOpen
                ? 'bg-purple-600 text-white shadow-purple-500/25'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
            }`}
          >
            <Cpu className="h-3.5 w-3.5 text-purple-400" />
            <span className="hidden md:inline">Redux DevTools</span>
            <span className="md:hidden">DevTools</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            title="View Wishlist"
          >
            <Heart className={`h-4 w-4 ${wishlistItems.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-xs">
                {wishlistItems.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95 shadow-indigo-500/20"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalCartCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-black text-indigo-700 shadow-xs">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
