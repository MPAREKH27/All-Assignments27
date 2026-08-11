import React, { useState } from 'react';
import { CART_ITEMS_DATA } from '../data/mockData';
import { CartItem } from '../types';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const UizardCartDashboard: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(CART_ITEMS_DATA);
  const [showHierarchyInspector, setShowHierarchyInspector] = useState<boolean>(true);
  const [couponCode, setCouponCode] = useState<string>('FLIPKART100');
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);
  const [superCoinsUsed, setSuperCoinsUsed] = useState<boolean>(true);
  const [checkoutStep, setCheckoutStep] = useState<boolean>(false);

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  // Price calculations
  const totalMRP = items.reduce((acc, i) => acc + (i.originalPrice * i.quantity), 0);
  const currentTotal = items.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const productDiscount = totalMRP - currentTotal;
  const couponDiscount = isCouponApplied ? 100 : 0;
  const superCoinsDiscount = superCoinsUsed ? 250 : 0;
  const deliveryCharge = currentTotal > 500 ? 0 : 40;
  const totalPayable = Math.max(0, currentTotal - couponDiscount - superCoinsDiscount + deliveryCharge);

  return (
    <div className="bg-slate-100 text-slate-800 min-h-screen p-4 md:p-6 font-sans">
      
      {/* Exercise Title & Hierarchy Controls */}
      <div className="max-w-6xl mx-auto mb-6 bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold uppercase rounded bg-blue-100 text-blue-800 border border-blue-300">
              Exercise 4: Uizard UI Layout Hierarchy
            </span>
            <h1 className="text-xl font-bold text-slate-900">Flipkart Shopping Cart Dashboard</h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Focuses on layout hierarchy: Primary CTA standing out vs Secondary actions, pricing transparency, and delivery trust signals.
          </p>
        </div>

        {/* Uizard Inspector Toggle */}
        <button
          onClick={() => setShowHierarchyInspector(!showHierarchyInspector)}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all border shadow-xs ${
            showHierarchyInspector
              ? 'bg-blue-600 text-white border-blue-700'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          {showHierarchyInspector ? 'Hide Hierarchy Map' : 'Show Hierarchy Map'}
        </button>
      </div>

      {/* Main Cart Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Address & Delivery Header Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Deliver to:</span>
              <span className="font-bold text-slate-900">Aarav Sharma, 560095</span>
              <span className="px-1.5 py-0.5 bg-slate-100 border text-[10px] rounded font-bold">HOME</span>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:underline">
              Change
            </button>
          </div>

          {/* Cart Items List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                My Cart ({items.length} Items)
              </h2>
              {showHierarchyInspector && (
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Container: Primary List Region
                </span>
              )}
            </div>

            {items.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-600">Your cart is currently empty</p>
                <button 
                  onClick={() => setItems(CART_ITEMS_DATA)}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
                >
                  Reload Sample Cart Items
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {items.map(item => (
                  <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 relative">
                    
                    {/* Item Image Box */}
                    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-tr ${item.imageBg} flex items-center justify-center text-white flex-shrink-0 shadow-sm relative`}>
                      <ShoppingBag className="w-10 h-10 text-white/70" />
                      <span className="absolute top-1 left-1 bg-emerald-500 text-black font-extrabold text-[9px] px-1.5 py-0.5 rounded">
                        {item.discountPct}% OFF
                      </span>
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-500">Seller: {item.seller}</p>

                      {/* Pricing Tag */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-slate-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          Save ₹{((item.originalPrice - item.price) * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                        <Truck className="w-3.5 h-3.5" />
                        <span>{item.deliveryDate}</span>
                      </div>

                      {/* Quantity Controls & Secondary Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 border border-slate-300 rounded-lg p-1 bg-slate-50">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded bg-white text-slate-700 border border-slate-200 font-bold flex items-center justify-center hover:bg-slate-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded bg-white text-slate-700 border border-slate-200 font-bold flex items-center justify-center hover:bg-slate-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Secondary Button Hierarchy */}
                        <div className="flex items-center gap-3 text-xs">
                          <button className="font-bold text-slate-600 hover:text-slate-900 transition-colors">
                            SAVE FOR LATER
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <span className="text-xs text-slate-500 mr-auto font-medium">
                Safe and Secure Payments • 100% Authentic Products
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: Price Details Summary Box (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Coupon Code Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-blue-600" /> Apply Discount Coupons
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold uppercase text-slate-900 outline-none"
              />
              <button
                onClick={() => setIsCouponApplied(!isCouponApplied)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isCouponApplied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isCouponApplied ? 'APPLIED ✓' : 'APPLY'}
              </button>
            </div>

            {isCouponApplied && (
              <p className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Coupon FLIPKART100 applied! Saved ₹100 extra.
              </p>
            )}
          </div>

          {/* SuperCoins Loyalty Savings */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-extrabold text-xs flex items-center justify-center">⚡</span>
                <span className="text-xs font-bold text-amber-900">Use 250 SuperCoins</span>
              </div>
              <input
                type="checkbox"
                checked={superCoinsUsed}
                onChange={() => setSuperCoinsUsed(!superCoinsUsed)}
                className="w-4 h-4 accent-amber-600 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-amber-800">
              Save extra ₹250 using your balance SuperCoins.
            </p>
          </div>

          {/* Price Breakdown Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 relative">
            
            {showHierarchyInspector && (
              <div className="absolute -top-3 left-4 bg-orange-100 text-orange-900 border border-orange-300 text-[10px] px-2 py-0.5 rounded font-sans font-bold shadow-xs">
                PRIMARY HIERARCHY SUMMARY & CTA
              </div>
            )}

            <h3 className="font-extrabold text-sm uppercase text-slate-500 border-b border-slate-100 pb-2">
              PRICE DETAILS
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Price ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span>₹{totalMRP.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount</span>
                <span>-₹{productDiscount.toLocaleString()}</span>
              </div>

              {isCouponApplied && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹100</span>
                </div>
              )}

              {superCoinsUsed && (
                <div className="flex justify-between text-amber-700 font-bold">
                  <span>SuperCoins Savings</span>
                  <span>-₹250</span>
                </div>
              )}

              <div className="flex justify-between text-slate-700">
                <span>Delivery Charges</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              <hr className="border-slate-200 my-2" />

              <div className="flex justify-between text-base font-black text-slate-900 pt-1">
                <span>Total Amount</span>
                <span className="text-slate-900">₹{totalPayable.toLocaleString()}</span>
              </div>

              {(productDiscount + couponDiscount + superCoinsDiscount) > 0 && (
                <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-center">
                  You will save ₹{(productDiscount + couponDiscount + superCoinsDiscount).toLocaleString()} on this order
                </p>
              )}
            </div>

            {/* Flipkart Primary CTA Button */}
            <button
              onClick={() => setCheckoutStep(true)}
              className="w-full py-3.5 bg-[#fb641b] hover:bg-[#e25510] text-white font-black rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
            >
              PLACE ORDER <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe and Secure Payments. 100% Authentic Products.</span>
            </div>

          </div>

        </div>

      </div>

      {/* Checkout Drawer Modal */}
      {checkoutStep && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Order Placed Successfully!
              </h3>
              <button onClick={() => setCheckoutStep(false)} className="text-slate-400 text-sm font-bold">✕</button>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2">
              <p className="font-bold text-emerald-900">Order ID: #OD94208572109</p>
              <p className="text-emerald-800">Total Paid: ₹{totalPayable.toLocaleString()}</p>
              <p className="text-emerald-700">Estimated Delivery: Tomorrow by 5 PM</p>
            </div>

            <button
              onClick={() => setCheckoutStep(false)}
              className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
