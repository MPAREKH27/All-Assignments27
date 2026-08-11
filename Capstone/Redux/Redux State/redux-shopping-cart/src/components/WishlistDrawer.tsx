import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromWishlist } from '../redux/actions/wishlistActions';
import { addToCart } from '../redux/actions/cartActions';
import { X, Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  if (!isOpen) return null;

  const handleMoveToCart = (product: any) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl dark:bg-slate-900 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  My Wishlist
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Managed by <code className="font-mono text-rose-600 dark:text-rose-400">wishlistReducer</code>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Your wishlist is empty
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Click the heart icon on any ProductCard to save items to your wishlist!
                </p>
              </div>
            ) : (
              wishlistItems.map(({ product, addedAt }) => (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-2xl border border-slate-200/80 p-3.5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1 dark:text-white">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => dispatch(removeFromWishlist(product.id))}
                          title="Remove from Wishlist"
                          className="text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400">Saved: {addedAt}</span>

                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-indigo-700 transition-all"
                      >
                        <ShoppingCart className="h-3 w-3" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
