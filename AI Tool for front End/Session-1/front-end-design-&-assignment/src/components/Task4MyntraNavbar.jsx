import React, { useState } from 'react';
import { 
  Navigation, 
  Smartphone, 
  Monitor, 
  Code, 
  Copy, 
  Check, 
  ExternalLink, 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Compass, 
  Home, 
  Heart, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';

export const Task4MyntraNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'prompt'>('preview');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  
  // State for interactive navigation preview
  const [activeNav, setActiveNav] = useState<string>('Home');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(3);

  const promptText = `Create a fully responsive Myntra-style Navigation Bar component in React using Tailwind CSS and Lucide React icons.

Requirements & Constraints:
1. Branding & Navigation Links:
   - Include a Myntra-inspired logo icon and brand text.
   - Core Navigation Links: "Home", "Explore" (or Men/Women categories), "Cart", and "Profile".
   - Active link styling using Myntra's signature pink accent (#ff3f6c).

2. Search Bar:
   - Centralized search input field with search magnifying glass icon, placeholder "Search for products, brands and more".

3. Layout Constraints:
   - Desktop Layout Requirements:
     * Sticky top header with fixed height, high z-index, and subtle bottom shadow.
     * Horizontal inline navbar displaying Logo, Navigation Links with top border hover indicators, Search Bar, and Icon Action buttons (Profile, Wishlist, Cart with dynamic counter badge).
   - Mobile Layout Requirements:
     * Top header with Logo, Search icon, Cart button with badge, and Hamburger menu button.
     * Slide-out mobile drawer menu containing full categories, Home, Explore, Profile details, and settings.
     * Fixed bottom navigation bar on mobile screen for instant quick access to Home, Explore, Cart, and Profile.

4. Deliverable:
   - Return full clean JSX code with React hooks (useState) for toggling mobile menu and active tabs. Use standard Tailwind utility classes.`;

  const jsxCodeSnippet = `import React, { useState } from 'react';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Compass, 
  Home, 
  Heart, 
  ChevronRight 
} from 'lucide-react';

export default function MyntraNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [cartCount, setCartCount] = useState(3);

  const navLinks = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'Explore', icon: Compass, href: '#' },
    { name: 'Categories', icon: null, href: '#' },
    { name: 'Studio', icon: null, href: '#', badge: 'NEW' },
  ];

  return (
    <div className="w-full relative font-sans">
      {/* DESKTOP & MOBILE HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#ff3f6c]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#ff3f6c] to-[#ff905a] flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                M
              </div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900 hidden sm:inline-block">
                MYNTRA
              </span>
            </a>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center space-x-8 h-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={\`relative h-full flex items-center text-xs font-bold tracking-wider uppercase px-1 \${
                  activeTab === link.name ? 'text-[#ff3f6c]' : 'text-gray-800 hover:text-[#ff3f6c]'
                }\`}
              >
                {link.name}
                {link.badge && (
                  <span className="ml-1 -mt-3 text-[9px] bg-[#ff3f6c] text-white px-1 rounded font-bold">
                    {link.badge}
                  </span>
                )}
                {activeTab === link.name && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#ff3f6c] rounded-t-md" />
                )}
              </a>
            ))}
          </nav>

          {/* DESKTOP SEARCH BAR */}
          <div className="flex-1 max-w-md hidden sm:block relative">
            <Search className="absolute left-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full bg-gray-100 text-xs text-gray-800 pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#ff3f6c] border border-transparent focus:border-[#ff3f6c]"
            />
          </div>

          {/* ACTIONS: PROFILE, WISHLIST, CART */}
          <div className="flex items-center space-x-6 text-xs font-semibold">
            <button onClick={() => setActiveTab('Profile')} className="flex flex-col items-center text-gray-700 hover:text-[#ff3f6c]">
              <User className="w-5 h-5 mb-0.5" />
              <span className="hidden md:inline">Profile</span>
            </button>

            <button onClick={() => setActiveTab('Cart')} className="flex flex-col items-center text-gray-700 hover:text-[#ff3f6c] relative">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 mb-0.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#ff3f6c] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Bag</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-4 bg-gradient-to-r from-[#ff3f6c] to-[#ff905a] text-white flex justify-between">
              <p className="font-bold text-sm">Welcome Guest</p>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
            </div>
            <div className="p-4 space-y-3 text-sm font-semibold">
              <a href="#" className="block py-2 border-b">Men Fashion</a>
              <a href="#" className="block py-2 border-b">Women Fashion</a>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden flex justify-around py-2">
        <button onClick={() => setActiveTab('Home')} className={activeTab === 'Home' ? 'text-[#ff3f6c]' : 'text-gray-500'}>
          <Home size={20} />
          <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => setActiveTab('Explore')} className={activeTab === 'Explore' ? 'text-[#ff3f6c]' : 'text-gray-500'}>
          <Compass size={20} />
          <span className="text-[10px]">Explore</span>
        </button>
        <button onClick={() => setActiveTab('Cart')} className={activeTab === 'Cart' ? 'text-[#ff3f6c]' : 'text-gray-500'}>
          <ShoppingBag size={20} />
          <span className="text-[10px]">Cart</span>
        </button>
        <button onClick={() => setActiveTab('Profile')} className={activeTab === 'Profile' ? 'text-[#ff3f6c]' : 'text-gray-500'}>
          <User size={20} />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </div>
  );
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(jsxCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class="space-y-6">
      
      {/* Title & Overview Card */}
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-pink-400 uppercase tracking-widest mb-1">
              <span>Task 4 of 4</span> • <span>File Generated: myntra-navbar.html</span>
            </div>
            <h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2">
              Myntra Responsive Navigation Bar (Prompt + JSX Code)
            </h2>
          </div>

          <div class="flex items-center space-x-2">
            <a 
              href="/myntra-navbar.html" 
              target="_blank" 
              rel="noreferrer"
              class="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition shadow-lg shadow-pink-600/30"
            >
              <ExternalLink className="w-4 h-4" /> Open myntra-navbar.html
            </a>
          </div>
        </div>

        <p class="text-slate-300 text-sm leading-relaxed max-w-4xl">
          We constructed a precise prompt specifying both desktop (sticky top header, hover underlines, inline links, cart badge) and mobile layout constraints (hamburger drawer, bottom quick action bar). 
          The returned JSX code and prompt have been saved in <code class="bg-slate-800 text-pink-300 px-2 py-0.5 rounded text-xs font-mono">myntra-navbar.html</code>.
        </p>

        {/* View Toggle Buttons */}
        <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
          <div class="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('preview')}
              class={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
                activeTab === 'preview' 
                  ? 'bg-pink-600 text-white shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Navigation className="w-4 h-4" /> Live Interactive Component
            </button>

            <button
              onClick={() => setActiveTab('prompt')}
              class={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
                activeTab === 'prompt' 
                  ? 'bg-pink-600 text-white shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" /> View Prompt Given to ChatGPT
            </button>

            <button
              onClick={() => setActiveTab('code')}
              class={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
                activeTab === 'code' 
                  ? 'bg-pink-600 text-white shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Code className="w-4 h-4" /> Generated Full JSX Code
            </button>
          </div>

          {/* Desktop vs Mobile Preview Switcher (Only visible in preview tab) */}
          {activeTab === 'preview' && (
            <div class="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setDeviceMode('desktop')}
                class={`px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 transition ${
                  deviceMode === 'desktop' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop View
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                class={`px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 transition ${
                  deviceMode === 'mobile' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile View (375px)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TAB 1: LIVE INTERACTIVE COMPONENT PREVIEW */}
      {activeTab === 'preview' && (
        <div class="space-y-4">
          <div class={`mx-auto transition-all duration-300 ${deviceMode === 'mobile' ? 'max-w-md' : 'w-full'}`}>
            <div class="bg-white rounded-xl border border-slate-300 shadow-md overflow-hidden relative min-h-[450px]">
              
              {/* Header Bar */}
              <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
                  
                  {/* Logo & Mobile Menu Toggle */}
                  <div class="flex items-center gap-3">
                    <button 
                      onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
                      class={`${deviceMode === 'desktop' ? 'hidden' : 'block'} p-1.5 text-gray-700 hover:text-[#ff3f6c]`}
                    >
                      {isMobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <div class="flex items-center gap-2">
                      <div class="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#ff3f6c] to-[#ff905a] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                        M
                      </div>
                      <span class={`font-extrabold text-lg text-gray-900 tracking-tight ${deviceMode === 'mobile' ? 'hidden' : 'inline-block'}`}>
                        MYNTRA
                      </span>
                    </div>
                  </div>

                  {/* Desktop Nav Links (Hidden in Mobile) */}
                  {deviceMode === 'desktop' && (
                    <nav class="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider text-gray-800 h-16">
                      {['Home', 'Explore', 'Categories', 'Studio'].map((item) => (
                        <button
                          key={item}
                          onClick={() => setActiveNav(item)}
                          class={`relative h-full flex items-center px-1 transition-colors ${
                            activeNav === item ? 'text-[#ff3f6c]' : 'hover:text-[#ff3f6c]'
                          }`}
                        >
                          {item}
                          {item === 'Studio' && (
                            <span class="ml-1 text-[9px] bg-[#ff3f6c] text-white px-1 rounded font-bold">NEW</span>
                          )}
                          {activeNav === item && (
                            <span class="absolute bottom-0 left-0 w-full h-[3px] bg-[#ff3f6c] rounded-t-sm" />
                          )}
                        </button>
                      ))}
                    </nav>
                  )}

                  {/* Search Input */}
                  <div class={`flex-1 max-w-xs relative ${deviceMode === 'mobile' ? 'hidden' : 'block'}`}>
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input 
                      type="text" 
                      placeholder="Search for products, brands..." 
                      class="w-full bg-gray-100 text-xs pl-8 pr-3 py-2 rounded focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#ff3f6c] border border-transparent focus:border-[#ff3f6c]"
                    />
                  </div>

                  {/* Actions: Profile, Cart */}
                  <div class="flex items-center space-x-4 text-xs font-semibold">
                    <button 
                      onClick={() => setActiveNav('Profile')} 
                      class={`flex flex-col items-center ${activeNav === 'Profile' ? 'text-[#ff3f6c]' : 'text-gray-700 hover:text-[#ff3f6c]'}`}
                    >
                      <User className="w-5 h-5" />
                      <span class={`text-[10px] ${deviceMode === 'mobile' ? 'hidden' : 'block'}`}>Profile</span>
                    </button>

                    <button 
                      onClick={() => setActiveNav('Cart')} 
                      class={`flex flex-col items-center relative ${activeNav === 'Cart' ? 'text-[#ff3f6c]' : 'text-gray-700 hover:text-[#ff3f6c]'}`}
                    >
                      <div class="relative">
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                          <span class="absolute -top-1.5 -right-2 bg-[#ff3f6c] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                      </div>
                      <span class={`text-[10px] ${deviceMode === 'mobile' ? 'hidden' : 'block'}`}>Bag</span>
                    </button>
                  </div>

                </div>
              </header>

              {/* View Canvas Body */}
              <div class="p-8 text-center bg-gray-50 flex flex-col items-center justify-center min-h-[300px]">
                <p class="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">Active Selected Route</p>
                <h3 class="text-3xl font-black text-[#ff3f6c] tracking-wider uppercase mb-2">{activeNav} View</h3>
                <p class="text-xs text-gray-500 max-w-sm">
                  Click navigation buttons on top or bottom to test active tab state transitions and Myntra pink underline indicators!
                </p>

                <div class="mt-6 flex items-center gap-2">
                  <span class="text-xs text-gray-600 font-semibold">Bag Item Count:</span>
                  <button 
                    onClick={() => setCartCount(prev => Math.max(0, prev - 1))}
                    class="px-2 py-0.5 bg-gray-200 rounded text-xs font-bold hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span class="font-mono font-bold text-sm text-[#ff3f6c] px-2">{cartCount}</span>
                  <button 
                    onClick={() => setCartCount(prev => prev + 1)}
                    class="px-2 py-0.5 bg-gray-200 rounded text-xs font-bold hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Mobile Drawer Slideout */}
              {isMobileDrawerOpen && (
                <div class="absolute inset-0 bg-white z-40 p-4 space-y-3 animate-fade-in border-t">
                  <div class="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-[#ff3f6c] text-white font-bold flex items-center justify-center text-xs">U</div>
                      <div>
                        <p class="font-bold text-xs text-gray-900">Welcome Guest</p>
                        <p class="text-[10px] text-gray-500">Access orders & wishlist</p>
                      </div>
                    </div>
                    <button onClick={() => setIsMobileDrawerOpen(false)} class="text-gray-500">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div class="space-y-2 text-xs font-semibold text-gray-700">
                    <a href="#" class="flex items-center justify-between py-2 border-b">
                      <span>Men Fashion</span> <ChevronRight className="w-4 h-4 text-gray-400" />
                    </a>
                    <a href="#" class="flex items-center justify-between py-2 border-b">
                      <span>Women Fashion</span> <ChevronRight className="w-4 h-4 text-gray-400" />
                    </a>
                    <a href="#" class="flex items-center justify-between py-2 border-b">
                      <span>Kids & Baby</span> <ChevronRight className="w-4 h-4 text-gray-400" />
                    </a>
                  </div>
                </div>
              )}

              {/* Mobile Bottom Quick Bar */}
              {deviceMode === 'mobile' && (
                <div class="border-t border-gray-200 bg-white py-2 px-6 flex justify-around items-center text-xs">
                  <button 
                    onClick={() => setActiveNav('Home')} 
                    class={`flex flex-col items-center text-[10px] font-bold ${activeNav === 'Home' ? 'text-[#ff3f6c]' : 'text-gray-500'}`}
                  >
                    <Home className="w-5 h-5 mb-0.5" /> Home
                  </button>
                  <button 
                    onClick={() => setActiveNav('Explore')} 
                    class={`flex flex-col items-center text-[10px] font-bold ${activeNav === 'Explore' ? 'text-[#ff3f6c]' : 'text-gray-500'}`}
                  >
                    <Compass className="w-5 h-5 mb-0.5" /> Explore
                  </button>
                  <button 
                    onClick={() => setActiveNav('Cart')} 
                    class={`flex flex-col items-center text-[10px] font-bold relative ${activeNav === 'Cart' ? 'text-[#ff3f6c]' : 'text-gray-500'}`}
                  >
                    <ShoppingBag className="w-5 h-5 mb-0.5" /> Cart
                  </button>
                  <button 
                    onClick={() => setActiveNav('Profile')} 
                    class={`flex flex-col items-center text-[10px] font-bold ${activeNav === 'Profile' ? 'text-[#ff3f6c]' : 'text-gray-500'}`}
                  >
                    <User className="w-5 h-5 mb-0.5" /> Profile
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROMPT GIVEN TO CHATGPT */}
      {activeTab === 'prompt' && (
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white">
          <h3 class="text-base font-bold text-slate-100 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" /> Prompt Provided to ChatGPT (Meeting All Constraints)
          </h3>
          <p class="text-xs text-slate-300 mb-4">
            This prompt explicitly mandates both desktop and mobile layout requirements, Myntra pink brand accent (<code class="text-pink-300 font-mono">#ff3f6c</code>), dynamic cart badge, drawer menu, and bottom navigation.
          </p>

          <div class="bg-slate-950 p-4 rounded-lg font-mono text-xs text-pink-300 leading-relaxed border border-slate-800 whitespace-pre-wrap">
            {promptText}
          </div>
        </div>
      )}

      {/* TAB 3: GENERATED JSX CODE */}
      {activeTab === 'code' && (
        <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div class="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <span class="text-xs font-mono text-slate-300 flex items-center gap-2">
              <Code className="w-4 h-4 text-pink-400" /> MyntraNavbar.jsx
            </span>
            <button
              onClick={handleCopyCode}
              class="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded text-xs font-bold flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied JSX!' : 'Copy Code Snippet'}
            </button>
          </div>

          <div class="p-4 bg-slate-950 font-mono text-xs text-slate-300 max-h-[500px] overflow-y-auto leading-relaxed border border-slate-800">
            <pre><code>{jsxCodeSnippet}</code></pre>
          </div>
        </div>
      )}

    </div>
  );
};
