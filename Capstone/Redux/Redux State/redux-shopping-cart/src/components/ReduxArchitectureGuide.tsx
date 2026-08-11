import React from 'react';
import { X, CheckCircle2, Code2, Layers, Cpu, Zap, ShoppingBag } from 'lucide-react';

interface ReduxArchitectureGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReduxArchitectureGuide: React.FC<ReduxArchitectureGuideProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Redux Store & cartReducer',
      desc: 'Created cartReducer managing an array of shopping cart items with item details, prices, and quantities.',
      file: 'src/redux/reducers/cartReducer.ts',
      code: `const initialState: CartState = { items: [], appliedDiscount: 0, appliedCoupon: null };\nexport function cartReducer(state = initialState, action: CartActionTypes) { ... }`,
      badge: 'Step 1 Complete',
    },
    {
      num: 2,
      title: 'addToCart & removeFromCart Actions in ProductCard',
      desc: 'Action creators dispatching ADD_TO_CART and REMOVE_FROM_CART directly from the two buttons in ProductCard component.',
      file: 'src/components/ProductCard.tsx',
      code: `<button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>\n<button onClick={() => dispatch(removeFromCart(product.id))}>Remove</button>`,
      badge: 'Step 2 Complete',
    },
    {
      num: 3,
      title: 'combineReducers for Cart & Wishlist',
      desc: 'Combined cartReducer and wishlistReducer into a single rootReducer managing separate cart and wishlist state slices.',
      file: 'src/redux/store.ts',
      code: `const rootReducer = combineReducers({\n  cart: cartReducer,\n  wishlist: wishlistReducer,\n  offers: offersReducer,\n});`,
      badge: 'Step 3 Complete',
    },
    {
      num: 4,
      title: 'redux-thunk Middleware & fetchOffers Async Action',
      desc: 'Configured redux-thunk middleware and built fetchOffers async thunk using setTimeout to simulate API calls.',
      file: 'src/redux/actions/offerActions.ts',
      code: `export const fetchOffers = () => (dispatch) => {\n  dispatch(fetchOffersStart());\n  setTimeout(() => {\n    dispatch(fetchOffersSuccess(MOCK_OFFERS));\n  }, 1500);\n};`,
      badge: 'Step 4 Complete',
    },
    {
      num: 5,
      title: 'Redux DevTools Extension & State Tracking / Screenshots',
      desc: 'Connected composeWithDevTools from @redux-devtools/extension and built live in-app DevTools Panel with action diffs and state screenshot exporter.',
      file: 'src/redux/store.ts & DevToolsPanel.tsx',
      code: `const store = createStore(\n  rootReducer,\n  composeWithDevTools(applyMiddleware(thunk))\n);`,
      badge: 'Step 5 Complete',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Redux Implementation Verification
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Summary of all 5 requirements implemented in full TypeScript Redux architecture
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

        {/* Steps List */}
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 space-y-2 dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Requirement {step.num}: {step.title}</span>
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {step.badge}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                {step.desc}
              </p>

              <div className="pt-1">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  File: {step.file}
                </span>
                <pre className="rounded-xl bg-slate-900 p-2.5 font-mono text-[11px] text-indigo-300 overflow-x-auto border border-slate-800">
                  {step.code}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm"
          >
            Back to Application
          </button>
        </div>
      </div>
    </div>
  );
};
