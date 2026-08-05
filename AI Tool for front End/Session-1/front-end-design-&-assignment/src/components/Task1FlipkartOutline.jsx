import React, { useState } from 'react';
import { PromptVariation } from '../types';
import { 
  Eye, 
  Code, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Search, 
  Grid, 
  Filter, 
  ListOrdered 
} from 'lucide-react';

export const Task1FlipkartOutline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'prompts'>('preview');
  const [copied, setCopied] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<number>(2); // Default to prompt 3 (best outline)

  const promptVariations: PromptVariation[] = [
    {
      id: '1',
      title: 'Prompt 1: Basic HTML Outline',
      promptText: 'Generate a basic HTML outline for a Flipkart product listing page with header, search bar, product grid, and footer.',
      structureHighlights: [
        'Generic <header>, <main>, and <footer> tags',
        'Simple 4-column CSS grid without sidebar filters',
        'Minimal textual placeholder product cards',
        'Basic single-input search bar'
      ],
      pros: 'Lightweight, quick, minimal markup.',
      cons: 'Lacks actual Flipkart branding, missing filters sidebar, no rating badges or discount prices.'
    },
    {
      id: '2',
      title: 'Prompt 2: Responsive E-Commerce Structure',
      promptText: 'Create a responsive e-commerce product listing page in HTML/Tailwind inspired by Flipkart. Include a header with search bar, a left filter sidebar for price and brands, a 3-column product grid with ratings and wishlist buttons, and a footer.',
      structureHighlights: [
        'Added left sidebar (<aside>) for price ranges and brand checkboxes',
        'Flexbox header with cart count badge and login button',
        'Product cards with image containers, star ratings, and price discounts',
        'Multi-column dark footer with category links'
      ],
      pros: 'Much closer to real e-commerce standards with proper sidebar and product cards.',
      cons: 'Missing Flipkart specific elements like Flipkart Plus logo, F-Assured badge, and sorting bar.'
    },
    {
      id: '3',
      title: 'Prompt 3: Full Flipkart Replica Outline (Selected Best Outline)',
      promptText: 'Generate a production-ready semantic HTML5 outline styled with Tailwind CSS for a Flipkart-style product listing page. Include: 1) Blue header with Flipkart logo, Explore Plus badge, search bar with icon, Login button, and Cart badge. 2) Sub-header category bar. 3) Breadcrumb navigation. 4) Left sidebar filters (price range, brands, ratings). 5) Sorting bar (Relevance, Price Low-High). 6) Product grid with wishlist icons, images, star rating pills, F-Assured badges, strike-through prices, and free delivery info. 7) Pagination. 8) 6-column Flipkart dark footer with address & payment icons.',
      structureHighlights: [
        'Complete 8-section layout mimicking real Flipkart web experience',
        'Flipkart blue (#2874f0) header and Flipkart Plus yellow badges',
        'F-Assured quality badge and discount calculation structure',
        'Fully responsive filter drawer and multi-column registered office address footer'
      ],
      pros: 'Comprehensive, pixel-accurate e-commerce architecture, highly realistic and ready for production.',
      cons: 'Requires Tailwind CSS CDN for instant visual rendering.'
    }
  ];

  const handleCopyCode = () => {
    fetch('/product-listing-outline.html')
      .then(res => res.text())
      .then(text => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert('Copied to clipboard'));
  };

  return (
    <div class="space-y-6">
      
      {/* Exercise Overview Header */}
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">
              <span>Task 1 of 4</span> • <span>File Generated: product-listing-outline.html</span>
            </div>
            <h2 class="text-2xl font-bold text-slate-100">
              Flipkart-Style Product Listing Page HTML Outline
            </h2>
          </div>
          
          <div class="flex items-center space-x-2">
            <a 
              href="/product-listing-outline.html" 
              target="_blank" 
              rel="noreferrer"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition shadow-lg shadow-blue-600/30"
            >
              <ExternalLink className="w-4 h-4" /> Open Full HTML File
            </a>
          </div>
        </div>

        <p class="text-slate-300 text-sm leading-relaxed max-w-4xl">
          We used ChatGPT to iterate over multiple prompt variations to construct a Flipkart-style product listing page.
          By refining the prompt to specify brand colors (<span class="text-blue-400 font-mono">#2874f0</span>), category strips, search input, left filter sidebar, star ratings, F-Assured badges, and 6-column footer, we produced the optimal HTML outline saved in <code class="bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-xs font-mono">product-listing-outline.html</code>.
        </p>

        {/* View Toggle Tabs */}
        <div class="flex items-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('preview')}
            class={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'preview' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" /> Live Interactive Preview
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            class={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'prompts' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Prompt Iterations & Structure Comparison
          </button>
          <button
            onClick={() => setActiveTab('code')}
            class={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'code' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Code className="w-4 h-4" /> HTML Source Code
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE INTERACTIVE PREVIEW */}
      {activeTab === 'preview' && (
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600 font-mono">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-400"></span>
              <span class="w-3 h-3 rounded-full bg-amber-400"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span class="ml-2 font-sans font-bold text-slate-700">Previewing product-listing-outline.html</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded font-bold">Flipkart Engine</span>
            </div>
          </div>

          <div class="w-full h-[750px] bg-slate-50">
            <iframe 
              src="/product-listing-outline.html" 
              title="Flipkart Product Listing Preview"
              class="w-full h-full border-none"
            />
          </div>
        </div>
      )}

      {/* TAB 2: PROMPT ITERATIONS & COMPARISON */}
      {activeTab === 'prompts' && (
        <div class="space-y-6">
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
            <h3 class="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Prompt Iteration Experiment (Hint Analysis)
            </h3>
            <p class="text-xs text-slate-300">
              By giving ChatGPT progressively detailed constraints, the outline changed from a generic placeholder grid into a full Flipkart e-commerce page structure.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promptVariations.map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => setSelectedPrompt(idx)}
                class={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPrompt === idx
                    ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      idx === 2 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {idx === 2 ? 'Selected Best Outline' : `Attempt ${idx + 1}`}
                    </span>
                  </div>

                  <h4 class="text-sm font-bold text-white mb-2">{item.title}</h4>
                  
                  <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 mb-4 leading-relaxed">
                    "{item.promptText}"
                  </div>

                  <h5 class="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-blue-400" /> Structure Highlights:
                  </h5>
                  <ul class="text-xs text-slate-400 space-y-1.5 mb-4 pl-2">
                    {item.structureHighlights.map((hl, i) => (
                      <li key={i} class="flex items-start gap-1.5">
                        <span class="text-blue-400 font-bold">•</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div class="border-t border-slate-800 pt-3 text-xs space-y-1">
                  <p class="text-emerald-400"><strong class="text-slate-200">Pros:</strong> {item.pros}</p>
                  <p class="text-amber-400"><strong class="text-slate-200">Cons:</strong> {item.cons}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Structural Hierarchy Map */}
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white">
            <h3 class="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Grid className="w-5 h-5 text-indigo-400" /> Flipkart HTML Outline Structural Hierarchy
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div class="flex items-center gap-2 text-blue-400 font-bold text-xs mb-2">
                  <Search className="w-4 h-4" /> 1. Header & Categories
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Flipkart Blue navbar with Plus logo, quick search form, Login modal trigger, Cart badge, and top category sub-bar (Electronics, TV, Fashion, etc.).
                </p>
              </div>

              <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div class="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
                  <Filter className="w-4 h-4" /> 2. Sidebar Filters
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Refined filter controls including clear all, category tree, price range sliders, brand checkboxes (Sony, boAt, JBL), and star rating selectors.
                </p>
              </div>

              <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2">
                  <ListOrdered className="w-4 h-4" /> 3. Sorting & Product Grid
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Sort tabs (Relevance, Popularity, Price), product cards with wishlist heart button, star rating pill, F-Assured badge, strike-through pricing, and delivery timeline.
                </p>
              </div>

              <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div class="flex items-center gap-2 text-purple-400 font-bold text-xs mb-2">
                  <Layers className="w-4 h-4" /> 4. Pagination & Footer
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Page navigator (Previous/1-60/Next) and Flipkart dark footer (#172337) with Mail Us, Registered Address, Social links, Seller portal, and payment badges.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HTML CODE VIEW */}
      {activeTab === 'code' && (
        <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div class="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <span class="text-xs font-mono text-slate-300 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-400" /> product-listing-outline.html
            </span>
            <button
              onClick={handleCopyCode}
              class="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied HTML!' : 'Copy Code'}
            </button>
          </div>

          <div class="p-4 overflow-x-auto">
            <p class="text-xs text-slate-400 mb-3">
              The full standalone code file is written to <code class="text-amber-300 font-mono">/product-listing-outline.html</code>. You can open or download it directly.
            </p>
            <div class="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 max-h-[500px] overflow-y-auto leading-relaxed border border-slate-800">
              <pre><code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flipkart Style Product Listing Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
  <!-- HEADER SECTION (Flipkart Blue #2874f0) -->
  <header class="bg-[#2874f0] text-white sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
      <a href="#" class="font-bold text-xl italic">Flipkart <span class="text-[#ffe500] text-xs">Plus</span></a>
      <input type="text" placeholder="Search for products, brands and more" class="w-full max-w-2xl py-2 px-4 text-sm text-gray-900 bg-white rounded-sm" />
      <nav class="flex items-center space-x-6">
        <a href="#" class="bg-white text-[#2874f0] px-8 py-1 rounded-sm font-medium">Login</a>
        <a href="#">Cart (3)</a>
      </nav>
    </div>
  </header>

  <!-- MAIN CONTENT (Filters Sidebar + Product Grid) -->
  <main class="max-w-7xl mx-auto px-4 py-3 grid grid-cols-1 lg:grid-cols-5 gap-3">
    <!-- FILTERS SIDEBAR -->
    <aside class="lg:col-span-1 bg-white p-4 rounded-sm">
      <h2 class="font-bold text-base">Filters</h2>
      <!-- Categories, Price Range, Brand Checkboxes -->
    </aside>

    <!-- PRODUCT GRID & SORTING -->
    <section class="lg:col-span-4 space-y-3">
      <div class="bg-white p-3 flex gap-4 text-xs font-bold">
        <span>Sort By: Relevance | Popularity | Price Low to High</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <!-- Product Cards with Star Ratings, Prices, F-Assured -->
      </div>
    </section>
  </main>

  <!-- FOOTER SECTION (Flipkart Dark #172337) -->
  <footer class="bg-[#172337] text-white text-xs py-8">
    <!-- 6 Columns: ABOUT, HELP, CONSUMER POLICY, SOCIAL, Mail Us, Registered Office -->
  </footer>
</body>
</html>`}</code></pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
