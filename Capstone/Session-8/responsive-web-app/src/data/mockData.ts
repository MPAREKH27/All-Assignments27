import {
  DeviceSpec,
  LayoutDifference,
  CrossBrowserIssue,
  LighthouseMetric,
  LighthouseOpportunity,
  ChatGPTSuggestion,
  TechProduct,
  Testimonial,
} from '../types';

export const DEVICE_SPECS: DeviceSpec[] = [
  {
    id: 'mobile',
    name: 'iPhone X / Mobile',
    width: 375,
    height: 812,
    iconName: 'Smartphone',
    description: 'Compact 375px screen with vertical stacking, full-width touch buttons, and slide-over menu drawer.',
    uaString: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
  },
  {
    id: 'tablet',
    name: 'iPad / Tablet',
    width: 768,
    height: 1024,
    iconName: 'Tablet',
    description: 'Medium 768px screen with 2-column grid layout, visible horizontal navigation header, and inline CTA buttons.',
    uaString: 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15',
  },
  {
    id: 'desktop',
    name: 'Desktop (1080p)',
    width: 1280,
    height: 800,
    iconName: 'Monitor',
    description: 'Full-size 1280px screen with 3-column product cards, expanded sidebar filtering, and spacious hero visual block.',
    uaString: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0',
  },
  {
    id: 'responsive',
    name: 'Fluid Viewport',
    width: 0,
    height: 0,
    iconName: 'Maximize2',
    description: 'Fills 100% of your browser window width. Drag or resize window to inspect continuous Tailwind breakpoint changes.',
    uaString: 'Native Browser Viewport',
  },
];

export const LAYOUT_DIFFERENCES: LayoutDifference[] = [
  {
    feature: 'Header Navigation Menu',
    mobileView: 'Collapsed into a compact hamburger button (☰) triggering a full-screen or slide-down navigation drawer overlay.',
    tabletDesktopView: 'Expanded horizontal menu bar with inline links (Home, Catalog, Audits, Analytics) and primary login/signup CTA buttons.',
    impact: 'Prevents header clutter on small displays while providing instant 1-click navigation on wider desktop viewports.',
    icon: 'Menu',
  },
  {
    feature: 'Hero Section & Image Grid',
    mobileView: 'Single vertical column layout: Badge → Headline → Stacked full-width CTA buttons → Hero Preview Graphic below.',
    tabletDesktopView: 'Balanced 2-column split layout: Left side contains copy & inline CTA buttons; Right side displays high-resolution visual stage.',
    impact: 'Maximizes vertical reading efficiency on mobile and utilizes horizontal widescreen real estate on desktop.',
    icon: 'Columns',
  },
  {
    feature: 'Product & Feature Cards Grid',
    mobileView: '1 Column stacked list with 100% card width, simplified metadata tags, and touch-friendly 48px action buttons.',
    tabletDesktopView: '2 Columns on tablet (768px) and 3 Columns on desktop (1024px+) with hover animations and inline badge previews.',
    impact: 'Optimizes content density so users can scan multiple cards simultaneously on larger displays.',
    icon: 'Grid',
  },
  {
    feature: 'Primary Action CTA Buttons',
    mobileView: 'Full-width stretched block buttons (`w-full`) pinned vertically for easy thumb reach on mobile touchscreens.',
    tabletDesktopView: 'Auto-width inline row buttons (`w-auto sm:flex-row`) with hover elevation and cursor feedback.',
    impact: 'Ensures ergonomically optimal touch targets on phones and concise visual buttons on desktops.',
    icon: 'MousePointer',
  },
];

export const CROSS_BROWSER_ISSUES: CrossBrowserIssue[] = [
  {
    id: 'cb-1',
    featureName: 'Custom Scrollbar & Webkit Styling',
    chromeBehavior: 'Chrome/Blink renders smooth rounded scrollbars via `::-webkit-scrollbar` with dynamic hover thumb states.',
    firefoxBehavior: 'Firefox uses W3C standard `scrollbar-width: thin` and `scrollbar-color`. Standard webkit scrollbar rules are ignored.',
    rootCause: 'Blink vs Gecko CSS engine differences in vendor-prefixed vs standardized scrollbar specs.',
    solution: 'Included both `@supports (-webkit-touch-callout: none)` and standard `scrollbar-width: thin` fallback declarations in index.css.',
    severity: 'medium',
  },
  {
    id: 'cb-2',
    featureName: 'Backdrop Filter Glassmorphism Blur Effect',
    chromeBehavior: 'Chrome processes `backdrop-filter: blur(12px)` with GPU acceleration and hardware composite layers.',
    firefoxBehavior: 'Firefox requires `layout.css.backdrop-filter.enabled` enabled in older builds; can exhibit slight raster lag if unoptimized.',
    rootCause: 'Gecko compositor pipeline handling of semi-transparent background blend modes.',
    solution: 'Added high-contrast solid semi-opaque background color fallback (`bg-slate-900/90` or `bg-white/95`) alongside backdrop-blur.',
    severity: 'medium',
  },
  {
    id: 'cb-3',
    featureName: 'Flexbox Gap Spacing & Subpixel Text Anti-aliasing',
    chromeBehavior: 'Chrome uses Subpixel Font Anti-Aliasing on MacOS/Windows with exact subpixel flex alignment.',
    firefoxBehavior: 'Firefox defaults to `grayscale` font smoothing on OS X, making thin weights appear slightly sharper/darker.',
    rootCause: 'Browser text rendering engines (Skia in Chrome vs DirectWrite/CoreText in Firefox).',
    solution: 'Declared explicit `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` in global CSS.',
    severity: 'low',
  },
];

export const LIGHTHOUSE_METRICS: LighthouseMetric[] = [
  {
    name: 'First Contentful Paint (FCP)',
    key: 'fcp',
    beforeValue: '2.4 s',
    afterValue: '0.8 s',
    unit: 's',
    scoreBefore: 68,
    scoreAfter: 99,
    description: 'Measures time from navigation to when the browser renders the first bit of content.',
  },
  {
    name: 'Largest Contentful Paint (LCP)',
    key: 'lcp',
    beforeValue: '4.1 s',
    afterValue: '1.2 s',
    unit: 's',
    scoreBefore: 52,
    scoreAfter: 98,
    description: 'Marks the time when the main hero image or text block has loaded completely.',
  },
  {
    name: 'Cumulative Layout Shift (CLS)',
    key: 'cls',
    beforeValue: '0.28',
    afterValue: '0.00',
    unit: '',
    scoreBefore: 45,
    scoreAfter: 100,
    description: 'Measures visual stability by tracking unexpected layout shifts during load.',
  },
  {
    name: 'Total Blocking Time (TBT)',
    key: 'tbt',
    beforeValue: '340 ms',
    afterValue: '40 ms',
    unit: 'ms',
    scoreBefore: 70,
    scoreAfter: 99,
    description: 'Total amount of time between FCP and Time to Interactive where main thread was blocked.',
  },
  {
    name: 'Speed Index',
    key: 'si',
    beforeValue: '3.6 s',
    afterValue: '1.1 s',
    unit: 's',
    scoreBefore: 62,
    scoreAfter: 97,
    description: 'Shows how quickly the contents of a page are visibly populated.',
  },
];

export const LIGHTHOUSE_OPPORTUNITIES: LighthouseOpportunity[] = [
  {
    id: 'opp-1',
    title: 'Properly size images & serve modern WebP formats',
    description: 'Image assets were overly large (4MB raw PNGs) and lacked modern formatting or width/height attributes.',
    savings: 'Est. 1.8 s LCP improvement',
    category: 'Performance',
    fixedInApp: true,
    fixActionKey: 'optimizedImages',
  },
  {
    id: 'opp-2',
    title: 'Fix text contrast ratio (WCAG 2.1 AA)',
    description: 'Muted grey text `#94A3B8` on light background had a 3.1:1 contrast ratio, failing the required 4.5:1 minimum.',
    savings: '100 Accessibility Score',
    category: 'Accessibility',
    fixedInApp: true,
    fixActionKey: 'highContrastMode',
  },
  {
    id: 'opp-3',
    title: 'Eliminate Cumulative Layout Shifts with explicit aspect ratios',
    description: 'Unsized hero images caused content below to jump 280px when rendered.',
    savings: '0.00 CLS Score',
    category: 'Performance',
    fixedInApp: true,
    fixActionKey: 'optimizedImages',
  },
  {
    id: 'opp-4',
    title: 'Defer offscreen images using native lazy loading (`loading="lazy"`)',
    description: 'Below-the-fold product card images were downloading during initial page load, blocking primary thread.',
    savings: 'Est. 650 KB saved on initial load',
    category: 'Performance',
    fixedInApp: true,
    fixActionKey: 'lazyLoadOffscreen',
  },
];

export const CHATGPT_SUGGESTIONS: ChatGPTSuggestion[] = [
  {
    id: 'chatgpt-1',
    title: 'Implement CSS `content-visibility: auto` & Off-screen Card Virtualization',
    promptText: 'Suggest improvements for my React app based on this Lighthouse performance report: LCP 4.1s, FCP 2.4s, CLS 0.28, high main thread blocking time during initial render.',
    recommendation: 'Apply `content-visibility: auto` and `contain-intrinsic-size` to heavy card lists below the fold. This instructs browser layout engines (Blink & Gecko) to skip rendering and layout calculations for off-screen cards until the user scrolls near them, dramatically cutting Initial Main Thread Blocking Time by 80%.',
    impactSummary: 'Reduces main thread layout workload from 340ms to 40ms and boosts Lighthouse TBT score to 99/100.',
    codeSnippet: `/* CSS Optimization suggested by ChatGPT */
.card-grid-item {
  content-visibility: auto;
  contain-intrinsic-size: 1px 360px;
}`,
    isApplied: true,
  },
  {
    id: 'chatgpt-2',
    title: 'Preload Critical Display Fonts & Apply `font-display: swap`',
    promptText: 'How can I prevent Flash of Unstyled Text (FOUT) and layout shifts caused by web font loading in my React Tailwind app?',
    recommendation: 'Add `<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>` in `<head>` and declare `font-display: swap` in `@font-face` rules. This ensures fallback system fonts render immediately without blocking paint, avoiding layout jumps when web fonts arrive.',
    impactSummary: 'Eliminates web font render-blocking and saves ~300ms on First Contentful Paint (FCP).',
    codeSnippet: `/* Font Swap declaration */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans.woff2') format('woff2');
}`,
    isApplied: true,
  },
  {
    id: 'chatgpt-3',
    title: 'Adaptive Responsive Image Srcset & Aspect-Ratio Placeholders',
    promptText: 'How do I serve different image resolutions for mobile vs desktop in React to improve LCP without layout shifts?',
    recommendation: 'Use HTML5 `<picture>` tags with `<source media="(min-width: 768px)" srcset="...">` or React `srcset` attributes with explicit CSS `aspect-ratio: 16 / 9` placeholders. This prevents layout reflows while serving smaller 400px webp images to mobile devices.',
    impactSummary: 'Cuts mobile payload bandwidth by 70% and achieves perfect 0.00 Cumulative Layout Shift (CLS).',
    codeSnippet: `<img
  src={optimizedUrl}
  srcSet={\`\${mobileUrl} 400w, \${desktopUrl} 1200w\`}
  sizes="(max-width: 768px) 100vw, 50vw"
  width="800"
  height="450"
  loading={isHero ? "eager" : "lazy"}
  className="w-full h-auto aspect-video rounded-xl object-cover"
/>`,
    isApplied: true,
  },
];

export const TECH_PRODUCTS: TechProduct[] = [
  {
    id: 'prod-1',
    title: 'DevPulse AI Analytics Studio',
    category: 'Developer Tools',
    description: 'Real-time performance telemetry dashboard for web applications with automated Lighthouse CI score tracking.',
    rating: 4.9,
    reviewsCount: 128,
    tag: 'High Performance',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    unoptimizedUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    price: '$49/mo',
    features: ['Instant FCP / LCP Tracking', 'Automated WCAG Audits', 'Multi-device Frame Simulation'],
  },
  {
    id: 'prod-2',
    title: 'Nexus Cross-Browser Tester',
    category: 'Testing & QA',
    description: 'Simultaneous engine testing suite verifying rendering parity across Blink, Gecko, and WebKit browser nodes.',
    rating: 4.8,
    reviewsCount: 94,
    tag: 'Cross-Platform',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    unoptimizedUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    price: '$29/mo',
    features: ['Chrome vs Firefox Diffing', 'Automated Visual Regression', 'DOM Snapshot Comparison'],
  },
  {
    id: 'prod-3',
    title: 'Aura Responsive Component Suite',
    category: 'UI Libraries',
    description: 'Fluid, accessible React component primitives with mathematically calculated padding and adaptive grid layout hooks.',
    rating: 5.0,
    reviewsCount: 210,
    tag: 'WCAG AAA Compliant',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    unoptimizedUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
    price: '$79 once',
    features: ['Zero Layout Shift (CLS 0.00)', 'Touch Target Standard (48px)', 'Tailwind CSS v4 Native'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Chen',
    role: 'Lead Frontend Architect',
    company: 'Veloce Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    content: 'Testing our mobile layout vs desktop in one unified interface helped us catch 3 critical flexbox wrap bugs before releasing to production.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Marcus Vance',
    role: 'Senior QA Specialist',
    company: 'CloudScale Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'The Lighthouse opportunity integration showed us exactly how to boost our performance score from 74 to 98 with simple React optimizations.',
    rating: 5,
  },
];
