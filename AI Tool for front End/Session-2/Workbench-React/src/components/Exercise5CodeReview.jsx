import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Code2, Sparkles, FileText, ArrowRight, ShieldAlert, Check, Layers } from 'lucide-react';
import { CodeViewer } from './CodeViewer';

export const Exercise5CodeReview: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'improvement1' | 'improvement2' | 'all'>('improvement1');

  const naiveAiCode = `// ❌ NAIVE AI-GENERATED COMPONENT (Copilot / ChatGPT raw output)
import React, { useState, useEffect } from 'react';

export function ProductList({ data }) {
  const [items, setItems] = useState([]);
  const [l, setL] = useState(true); // ⚠️ Bad variable name

  useEffect(() => {
    // ⚠️ CRITICAL BUG 1: No AbortController cleanup! Memory leak if component unmounts.
    fetch('/api/products')
      .then(res => res.json())
      .then(d => {
        setItems(d);
        setL(false);
      });
  }, []);

  return (
    <div>
      {l ? <p>Loading...</p> : items.map(x => ( // ⚠️ CRITICAL BUG 2: Crashes if data/items is undefined, no PropTypes or default fallback!
        <div>
          <h3>{x.n}</h3>
          <p>\${x.p}</p>
        </div>
      ))}
    </div>
  );
}`;

  const productionGradeCode = `// ✅ PRODUCTION-READY REFACTORED COMPONENT
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Production-Grade ProductList Component
 * Solves AI memory leaks, missing prop validation, and bad variable naming.
 */
export function ProductList({ initialCategory = 'all', onError }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // ✅ IMPROVEMENT 1: AbortController prevents race conditions & memory leaks
    const controller = new AbortController();
    setIsLoading(true);
    setErrorMessage(null);

    async function fetchProducts() {
      try {
        const response = await fetch(\`/api/products?category=\${initialCategory}\`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(\`Failed to fetch products: \${response.status}\`);
        }

        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          const msg = err.message || 'Error loading product catalog';
          setErrorMessage(msg);
          if (onError) onError(msg);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    // Cleanup function cancels pending request if unmounted
    return () => controller.abort();
  }, [initialCategory, onError]);

  if (isLoading) {
    return <div className="p-4 text-slate-400">Loading products catalog...</div>;
  }

  if (errorMessage) {
    return (
      <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl">
        <p className="font-semibold">{errorMessage}</p>
      </div>
    );
  }

  // ✅ IMPROVEMENT 2: Guarded map & fallback for empty arrays
  if (!products || products.length === 0) {
    return <div className="p-4 text-slate-400">No products available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h3 className="font-bold text-slate-100">{product.name}</h3>
          <p className="text-cyan-400 font-semibold mt-1">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

// ✅ PropTypes guarantee type safety & clear warnings in development
ProductList.propTypes = {
  initialCategory: PropTypes.string,
  onError: PropTypes.func
};

ProductList.defaultProps = {
  initialCategory: 'all',
  onError: () => {}
};

export default ProductList;`;

  return (
    <div className="space-y-8 pb-12">
      {/* Exercise Overview Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Task 5 of 5
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              AI Code Review: 2 Key Improvements Before Production
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              When Copilot or ChatGPT generates React components, the code often works in isolation but lacks production robustness. Here is a review of 2 critical improvements you must make before deploying to production.
            </p>
          </div>
        </div>
      </div>

      {/* The 2 Main Improvements Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Improvement 1 Card */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Critical Improvement 1
          </div>

          <div className="flex items-center gap-2 text-amber-400 font-bold text-base pt-1">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Prevent Memory Leaks & Race Conditions (`AbortController`)</span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              <strong>The Issue in AI Code:</strong> Copilot and ChatGPT often write <code className="text-cyan-300">useEffect</code> data-fetching blocks without return cleanup functions or request cancellation.
            </p>
            <p className="text-slate-400">
              If the user navigates away or types quickly in a search bar, previous async fetch promises resolve on an unmounted component, causing memory leaks, state updates on unmounted trees, and out-of-order race condition bugs.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300">
            <span className="text-slate-500">// ✅ Solution: Use AbortController cleanup</span>
            <br />
            const controller = new AbortController();
            <br />
            fetch(url, {'{'} signal: controller.signal {'}'});
            <br />
            return () =&gt; controller.abort();
          </div>
        </div>

        {/* Improvement 2 Card */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Critical Improvement 2
          </div>

          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base pt-1">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Strict Prop Validation & Defensive Fallbacks (`PropTypes`)</span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              <strong>The Issue in AI Code:</strong> AI models frequently omit prop validation (<code className="text-amber-300">PropTypes</code> or TypeScript interfaces) and use vague variable names like <code className="text-rose-400">data</code> or <code className="text-rose-400">l</code>.
            </p>
            <p className="text-slate-400">
              If the parent passes <code className="text-slate-200">undefined</code>, <code className="text-slate-200">null</code>, or a string instead of an array, the application immediately throws an uncaught runtime error (<code className="text-rose-400">TypeError: data.map is not a function</code>).
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300">
            <span className="text-slate-500">// ✅ Solution: PropTypes & Default Fallback</span>
            <br />
            Component.propTypes = {'{'}
            <br />
            {'  '}items: PropTypes.arrayOf(PropTypes.object).isRequired,
            <br />
            {'  '}onSelect: PropTypes.func
            <br />
            {'}'};
          </div>
        </div>

      </div>

      {/* Bonus Production Hardening Techniques */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Bonus 3 Production-Hardening Checklist for AI Code
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="font-bold text-slate-100">Descriptive Variable Naming</h4>
            <p className="text-slate-400">
              Replace single-letter AI variables like <code className="text-amber-300">l</code> with <code className="text-emerald-400">isLoading</code> and <code className="text-amber-300">x</code> with <code className="text-emerald-400">product</code> for developer readability.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">4</span>
            <h4 className="font-bold text-slate-100">Accessibility (ARIA & Alt Text)</h4>
            <p className="text-slate-400">
              Ensure interactive elements have screen-reader labels (<code className="text-cyan-300">aria-label</code>) and images contain meaningful descriptive <code className="text-cyan-300">alt</code> attributes.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center justify-center">5</span>
            <h4 className="font-bold text-slate-100">Error Boundaries & Empty States</h4>
            <p className="text-slate-400">
              Wrap components in React Error Boundaries and render friendly empty state UI rather than blank empty boxes when datasets return zero results.
            </p>
          </div>

        </div>
      </div>

      {/* Code Comparison (Naive AI Output vs Production Ready) */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-amber-400" />
          Code Comparison: Naive AI Code vs Production Refactored
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full inline-block mb-2">
              ❌ Naive AI Output (Missing Cleanups & Types)
            </span>
            <CodeViewer
              filename="ProductList.naive.jsx"
              jsxCode={naiveAiCode}
              jsCode={naiveAiCode}
            />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block mb-2">
              ✅ Production-Ready Refactored Code
            </span>
            <CodeViewer
              filename="ProductList.production.jsx"
              jsxCode={productionGradeCode}
              jsCode={productionGradeCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
