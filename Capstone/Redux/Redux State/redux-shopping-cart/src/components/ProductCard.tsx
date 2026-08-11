import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, RootState } from '../types/redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { toggleWishlist } from '../redux/actions/wishlistActions';
import { ShoppingCart, Trash2, Heart, Check, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

/**
 * Requirement 2: ProductCard Component
 * Dispatches addToCart and removeFromCart Redux actions from two buttons.
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  // Redux Selectors
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const isInCart = Boolean(cartItem);
  const isInWishlist = wishlistItems.some((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      {/* Top Image Badge Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tag Badge */}
        {product.tag && (
          <span className="absolute top-3 left-3 rounded-full bg-indigo-600/90 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
            {product.tag}
          </span>
        )}

        {/* Wishlist Button (Requirement 3 support) */}
        <button
          onClick={handleToggleWishlist}
          title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 shadow-md ${
            isInWishlist
              ? 'bg-rose-500 text-white hover:bg-rose-600'
              : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500 dark:bg-slate-900/90 dark:text-slate-200'
          }`}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Cart Quantity Indicator overlay */}
        {isInCart && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-emerald-600/95 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-md">
            <Check className="h-3.5 w-3.5" />
            <span>In Cart ({cartItem?.quantity})</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {product.rating}
            </span>
            <span className="text-xs text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="line-clamp-1 text-base font-bold text-slate-900 dark:text-white">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
          {product.description}
        </p>

        {/* Price display */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-slate-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons for Requirement 2 */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* Button 1: Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95 shadow-xs"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Add to Cart</span>
          </button>

          {/* Button 2: Remove from Cart */}
          <button
            onClick={handleRemoveFromCart}
            disabled={!isInCart}
            className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all active:scale-95 ${
              isInCart
                ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400'
                : 'border-slate-200 bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500'
            }`}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};
