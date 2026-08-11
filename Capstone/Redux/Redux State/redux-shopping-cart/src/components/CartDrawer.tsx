import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from '../redux/actions/cartActions';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  CheckCircle2,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, appliedDiscount, appliedCoupon } = useSelector(
    (state: RootState) => state.cart
  );

  if (!isOpen) return null;

  // Calculate Subtotal & Discounts
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl dark:bg-slate-900 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Shopping Cart
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Managed by <code className="font-mono text-indigo-600 dark:text-indigo-400">cartReducer</code>
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

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Your cart is currently empty
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Add items from the ProductCard buttons to test Redux actions!
                </p>
              </div>
            ) : (
              items.map(({ product, quantity, addedAt }) => (
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
                          onClick={() => dispatch(removeFromCart(product.id))}
                          title="Remove from Cart"
                          className="text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        ${product.price.toFixed(2)} each • Added {addedAt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
                        <button
                          onClick={() =>
                            dispatch(updateCartQuantity(product.id, quantity - 1))
                          }
                          className="rounded p-1 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800 dark:text-slate-200">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(updateCartQuantity(product.id, quantity + 1))
                          }
                          className="rounded p-1 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 p-6 space-y-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              {/* Applied Coupon Info */}
              {appliedCoupon && (
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    Coupon: {appliedCoupon} ({appliedDiscount}% Off)
                  </span>
                  <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900 dark:border-slate-800 dark:text-white">
                  <span>Estimated Total</span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear Cart</span>
                </button>

                <button
                  onClick={() => alert(`Simulated checkout for $${grandTotal.toFixed(2)}!`)}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-md"
                >
                  <span>Checkout</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
