import React, { useState } from 'react';
import { ShoppingBag, Star, ShieldCheck, Heart, AlertTriangle, Terminal, Sparkles, Code2, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react';
import { FLIPKART_PRODUCTS } from '../data/sampleData';
import { CodeViewer } from './CodeViewer';

export const Exercise2FlipkartCard: React.FC = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);
  const [activeErrorCase, setActiveErrorCase] = useState<'key' | 'undefined' | 'deps' | 'proptype'>('key');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const currentProduct = FLIPKART_PRODUCTS[selectedProductIndex];

  const errorScenarios = {
    key: {
      title: 'Warning: Missing "key" prop in list',
      terminalError: `Warning: Each child in a list should have a unique "key" prop.\n\nCheck the render method of \`ProductList\`.\n    at FlipkartProductCard (src/components/FlipkartProductCard.jsx:14:5)\n    at ProductList (src/components/ProductList.jsx:8:12)`,
      buggyCodeSnippet: `// ❌ BUGGY CODE (ProductList.jsx)
{products.map((item) => (
  <FlipkartProductCard product={item} /> // Missing key={item.id}
))}`,
      fixedCodeSnippet: `// ✅ FIXED CODE (ProductList.jsx)
{products.map((item) => (
  <FlipkartProductCard key={item.id} product={item} />
)}`,
      chatgptExplanation: `### Why this error occurs:
React uses the \`key\` prop to track list elements during reconciliation (diffing algorithm). When items change, reorder, or update, React needs a persistent unique ID to avoid re-rendering the entire list or losing state.

### How to Fix It:
1. Pass a unique identifier (like \`item.id\` or \`item.sku\`) to the root element inside the \`.map()\`.
2. Avoid using the array index (\`key={index}\`) if list items can be reordered or filtered.`
    },
    undefined: {
      title: 'TypeError: Cannot read properties of undefined',
      terminalError: `Uncaught TypeError: Cannot read properties of undefined (reading 'map')\n    at ProductList (src/components/ProductList.jsx:9:18)\n    at renderWithHooks (react-dom.development.js:16305)\n    at mountIndeterminateComponent (react-dom.development.js:20074)`,
      buggyCodeSnippet: `// ❌ BUGGY CODE
function ProductList({ products }) {
  // If products is initially undefined while fetching:
  return products.map(p => <FlipkartProductCard product={p} />);
}`,
      fixedCodeSnippet: `// ✅ FIXED CODE
function ProductList({ products = [] }) {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }
  return (
    <div className="product-grid">
      {products.map(p => <FlipkartProductCard key={p.id} product={p} />)}
    </div>
  );
}`,
      chatgptExplanation: `### Why this error occurs:
Your component is attempting to call \`.map()\` on \`products\` before data fetching completes or when the prop is passed as \`undefined\`.

### How to Fix It:
1. Provide a default prop value: \`products = []\`.
2. Use optional chaining: \`products?.map(...)\`.
3. Render a loading or empty state guard clause before mapping.`
    },
    deps: {
      title: 'React Hook useEffect missing dependency',
      terminalError: `src/components/FlipkartProductCard.jsx:22:6: React Hook useEffect has a missing dependency: 'product.id'. Either include it or remove the dependency array. (react-hooks/exhaustive-deps)`,
      buggyCodeSnippet: `// ❌ BUGGY CODE
useEffect(() => {
  fetchProductReviews(product.id);
}, []); // Warning: product.id is missing from dependency array!`,
      fixedCodeSnippet: `// ✅ FIXED CODE
useEffect(() => {
  fetchProductReviews(product.id);
}, [product.id]); // Properly declares product.id dependency`,
      chatgptExplanation: `### Why this warning occurs:
The ESLint \`react-hooks/exhaustive-deps\` rule ensures that your \`useEffect\` re-runs whenever any variable referenced inside the effect closure updates. If \`product.id\` changes and isn't in the dependency array, your effect will operate on stale state!

### How to Fix It:
Include all reactive values used inside \`useEffect\` in its dependency array, or wrap helper functions in \`useCallback\`.`
    },
    proptype: {
      title: 'Failed prop type: Invalid prop type string',
      terminalError: `Warning: Failed prop type: Invalid prop \`price\` of type \`string\` supplied to \`FlipkartProductCard\`, expected \`number\`.\n    at FlipkartProductCard (src/components/FlipkartProductCard.jsx:32:1)`,
      buggyCodeSnippet: `// ❌ BUGGY CODE
<FlipkartProductCard price="1499" /> // Passed string instead of number`,
      fixedCodeSnippet: `// ✅ FIXED CODE
<FlipkartProductCard price={1499} /> // Passed as number JSX expression`,
      chatgptExplanation: `### Why this warning occurs:
PropTypes or TypeScript expected a JavaScript \`number\` to perform calculations like discount percentages, but received a raw string \`"1499"\`.

### How to Fix It:
1. Pass numbers enclosed in curly braces: \`price={1499}\`.
2. Or parse the string inside the component using \`Number(price)\` or \`parseFloat(price)\`.`
    }
  };

  const currentError = errorScenarios[activeErrorCase];

  const chatgptPromptTemplate = `I am building a React component for a Flipkart-style product card in VS Code.
I am seeing the following error/warning in my terminal:

--- ERROR LOG ---
${currentError.terminalError}
--- MY REACT CODE ---
${currentError.buggyCodeSnippet}

Can you explain why this error is happening and provide the exact refactored React component code to fix it?`;

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(chatgptPromptTemplate);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const flipkartJSX = `// FlipkartProductCard.jsx - Clean Flipkart-style Product Card
import React from 'react';

/**
 * FlipkartProductCard Component
 * Displays product image, title, rating, price, discount badge, and delivery details.
 */
export function FlipkartProductCard({
  title,
  price,
  originalPrice,
  discountPercent,
  rating,
  reviewCount,
  imageUrl,
  inStock = true,
  deliveryTime = 'Free Delivery',
  brand = 'Flipkart'
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row max-w-2xl p-4 gap-4">
      
      {/* Left: Product Image & Badges */}
      <div className="relative w-full md:w-48 aspect-square shrink-0 bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center p-2">
        <img
          src={imageUrl}
          alt={title}
          className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
        />
        {discountPercent > 0 && (
          <span className="absolute top-2 left-2 bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Right: Details & Price */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wide">
            {brand}
          </span>
          <h3 className="text-base font-semibold text-slate-100 line-clamp-2 mt-0.5" title={title}>
            {title}
          </h3>

          {/* Rating Badge */}
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <span>{rating}</span>
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </span>
            <span className="text-xs text-slate-400 font-medium">
              ({reviewCount.toLocaleString()} Ratings)
            </span>
            <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-bold">
              f-Assured
            </span>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-100">
              ₹{price.toLocaleString('en-IN')}
            </span>
            {originalPrice > price && (
              <span className="text-sm text-slate-500 line-through">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs text-emerald-400 font-bold">
              {discountPercent}% discount
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
            <span className={inStock ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
              {inStock ? deliveryTime : 'Out of Stock'}
            </span>
            <button className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-1.5 rounded-lg font-bold transition shadow">
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FlipkartProductCard;`;

  const flipkartJS = `// FlipkartProductCard.js - Standard JavaScript with PropTypes
import React from 'react';
import PropTypes from 'prop-types';

export function FlipkartProductCard({ title, price, originalPrice, discountPercent, rating, imageUrl }) {
  return (
    <div className="flipkart-card">
      <img src={imageUrl} alt={title} style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
      <h3>{title}</h3>
      <div>Rating: {rating} ★</div>
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>₹{price}</div>
      {originalPrice && <span style={{ textDecoration: 'line-through' }}>₹{originalPrice}</span>}
      <span>{discountPercent}% OFF</span>
    </div>
  );
}

FlipkartProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  discountPercent: PropTypes.number,
  rating: PropTypes.number,
  imageUrl: PropTypes.string.isRequired
};

export default FlipkartProductCard;`;

  return (
    <div className="space-y-8 pb-12">
      {/* Exercise Overview Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              Task 2 of 5
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              Flipkart Product Card & ChatGPT Terminal Debugger
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Display a Flipkart-style product card with image, title, price, and ratings. Copy terminal error messages into ChatGPT to diagnose and fix common React warnings or crash errors!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Flipkart Product Card Render */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                Live Flipkart Product Card
              </h3>
              
              {/* Item Selector */}
              <select
                value={selectedProductIndex}
                onChange={e => setSelectedProductIndex(Number(e.target.value))}
                className="bg-slate-800 text-xs border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500"
              >
                {FLIPKART_PRODUCTS.map((p, idx) => (
                  <option key={p.id} value={idx}>{p.brand} - ₹{p.price}</option>
                ))}
              </select>
            </div>

            {/* Flipkart Component UI */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row gap-4 relative">
                
                {/* Wishlist Heart */}
                <button
                  onClick={() => setInWishlist(!inWishlist)}
                  className={`absolute top-3 right-3 p-2 rounded-full border transition z-10 ${
                    inWishlist ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-slate-800/80 text-slate-400 border-slate-700'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>

                {/* Product Image */}
                <div className="w-full sm:w-36 aspect-square shrink-0 bg-slate-950 rounded-xl p-2 flex items-center justify-center border border-slate-800">
                  <img
                    src={currentProduct.imageUrl}
                    alt={currentProduct.title}
                    className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                        {currentProduct.brand}
                      </span>
                      {currentProduct.tag && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                          {currentProduct.tag}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-slate-100 line-clamp-2 mt-1">
                      {currentProduct.title}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1 shadow">
                        <span>{currentProduct.rating}</span>
                        <Star className="w-3 h-3 fill-current" />
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        ({currentProduct.reviewCount.toLocaleString()} ratings)
                      </span>
                      <span className="text-[11px] bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded font-bold">
                        f-Assured
                      </span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-slate-100">
                        ₹{currentProduct.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 line-through">
                        ₹{currentProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {currentProduct.discountPercent}% OFF
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-1">
                      {currentProduct.deliveryTime}
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Flipkart Features Badge */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Genuine
              </div>
              <div className="flex items-center justify-center gap-1 text-slate-300">
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" /> 7 Days Replacement
              </div>
              <div className="flex items-center justify-center gap-1 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400" /> Verified Seller
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal & ChatGPT Debugger Simulator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-rose-400" />
                VS Code Terminal & ChatGPT Debugger
              </h3>
              <span className="text-xs text-slate-400 font-sans">
                Select a error scenario to simulate ChatGPT diagnosis:
              </span>
            </div>

            {/* Error Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {(Object.keys(errorScenarios) as Array<keyof typeof errorScenarios>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveErrorCase(key)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition border ${
                    activeErrorCase === key
                      ? 'bg-rose-500/10 border-rose-500/50 text-rose-300 shadow'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {key === 'key' && '1. Missing Key'}
                  {key === 'undefined' && '2. Map Undefined'}
                  {key === 'deps' && '3. Hook Deps'}
                  {key === 'proptype' && '4. PropType Warning'}
                </button>
              ))}
            </div>

            {/* Terminal Window View */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-rose-400 leading-relaxed shadow-inner mb-4">
              <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 mb-2 border-b border-slate-800 font-sans">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-rose-400" />
                  VS Code Integrated Terminal (bash / npm run dev)
                </span>
                <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  {currentError.title}
                </span>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-[11px] text-rose-300/90">
                {currentError.terminalError}
              </pre>
            </div>

            {/* ChatGPT Prompt & Solution Box */}
            <div className="bg-slate-950/80 rounded-xl border border-emerald-500/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-100">
                    ChatGPT Prompt & Diagnostic Output
                  </span>
                </div>

                <button
                  onClick={copyPromptToClipboard}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {copiedPrompt ? 'Copied Prompt!' : 'Copy Prompt for ChatGPT'}
                </button>
              </div>

              {/* Buggy vs Fixed Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-2">
                <div className="bg-slate-900 p-3 rounded-lg border border-rose-500/30">
                  <span className="text-rose-400 font-bold block mb-1 font-sans">
                    ❌ Code Before (Causes Error):
                  </span>
                  <pre className="text-slate-300 whitespace-pre-wrap text-[11px]">
                    {currentError.buggyCodeSnippet}
                  </pre>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-emerald-500/30">
                  <span className="text-emerald-400 font-bold block mb-1 font-sans">
                    ✅ Fixed Code Suggested by ChatGPT:
                  </span>
                  <pre className="text-slate-300 whitespace-pre-wrap text-[11px]">
                    {currentError.fixedCodeSnippet}
                  </pre>
                </div>
              </div>

              {/* ChatGPT Explanation Breakdown */}
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1 font-sans">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1">
                  💡 ChatGPT Explanation:
                </h4>
                <div className="text-slate-300 text-xs leading-relaxed">
                  {currentError.chatgptExplanation}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Code Viewers */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          Task 2 Full Code Files (FlipkartProductCard in JSX & JS)
        </h3>
        <CodeViewer
          filename="FlipkartProductCard.jsx"
          jsxCode={flipkartJSX}
          jsCode={flipkartJS}
          description="Error-free Flipkart Product Card component"
        />
      </div>
    </div>
  );
};
