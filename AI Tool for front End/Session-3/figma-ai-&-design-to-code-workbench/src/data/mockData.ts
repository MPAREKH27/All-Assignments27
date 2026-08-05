import { TaskStatus, WireframeSection, SurprisingFeature, MovieCardData, FigmaTemplate, HandoffStep } from '../types';

import musicWireframeImg from '../assets/images/music_wireframe_1785924055313.jpg';
import uizardFoodImg from '../assets/images/uizard_food_app_1785924074993.jpg';
import dunePosterImg from '../assets/images/dune_movie_poster_1785924090984.jpg';

export const INITIAL_TASKS: TaskStatus[] = [
  {
    id: 'task1',
    title: '1. Figma AI Music Wireframe',
    subtitle: 'Generate wireframe for Music Playlist Manager, export image & upload to folder',
    completed: true,
    uploadedArtifact: 'music_playlist_wireframe_v1.png',
  },
  {
    id: 'task2',
    title: '2. Uizard Food Delivery App Prototype',
    subtitle: 'Generate prototype from prompt, download preview & note surprising AI layout features',
    completed: true,
    uploadedArtifact: 'uizard_food_delivery_prototype.jpg',
    notes: 'Surprised by AI-driven contextual search auto-categorization and dynamic proximity restaurant ranking.',
  },
  {
    id: 'task3',
    title: '3. Figma to Code Verification',
    subtitle: 'Export Figma design to HTML/CSS via plugin & verify responsive layout in browser',
    completed: true,
    uploadedArtifact: 'figma_to_code_verified.html',
  },
  {
    id: 'task4',
    title: '4. Pure HTML & CSS Movie Card',
    subtitle: 'Manual conversion of BookMyShow movie card using strictly HTML and CSS',
    completed: true,
    uploadedArtifact: 'bookmyshow_movie_card.zip',
  },
  {
    id: 'task5',
    title: '5. Design-to-Code Handoff Workflow',
    subtitle: 'Comprehensive 5-step handoff methodology & code export plugin guide',
    completed: true,
    uploadedArtifact: 'design_handoff_workflow_guide.pdf',
  },
];

export const INITIAL_WIREFRAME_SECTIONS: WireframeSection[] = [
  {
    id: 'sidebar',
    name: 'Primary Navigation Sidebar',
    type: 'sidebar',
    description: 'Home, Explore, Library, Saved Playlists, Created Playlists list & user profile shortcut',
    visible: true,
  },
  {
    id: 'header',
    name: 'Top Search & Filter Header',
    type: 'header',
    description: 'Omni search bar, filter tags (Chill, Workout, Focus, Jazz), notifications & account avatar',
    visible: true,
  },
  {
    id: 'banner',
    name: 'Featured Playlist Hero Banner',
    type: 'banner',
    description: 'Curated mix hero card with Play button, track count, total duration & album art stack',
    visible: true,
  },
  {
    id: 'grid',
    name: 'Recent & Suggested Playlist Grid',
    type: 'grid',
    description: '4x2 grid of playlist cards with hover overlay controls, creator tags, and song counters',
    visible: true,
  },
  {
    id: 'list',
    name: 'Top Trending Tracks List',
    type: 'list',
    description: 'Table layout with track number, title, artist, album name, play count & duration',
    visible: true,
  },
  {
    id: 'player',
    name: 'Persistent Audio Player Bar',
    type: 'player',
    description: 'Fixed bottom playback bar with scrubber timeline, volume control, queue toggle & shuffle/repeat',
    visible: true,
  },
];

export const SURPRISING_FEATURES: SurprisingFeature[] = [
  {
    id: 'feat-1',
    title: 'Contextual AI Search with Smart Cravings Chips',
    category: 'Search',
    description: 'The search header auto-injects smart pill tags like "Under 30 mins", "Top Rated 4.5+", "Free Delivery", and "Veg Only" based on location and time of day.',
    aiInsight: 'Surprising Layout Feature: Uizard AI automatically grouped search intent with real-time filter chips right inside the search container without requiring secondary navigation taps.',
    highlightCoordinates: { x: 10, y: 12, width: 80, height: 12 },
  },
  {
    id: 'feat-2',
    title: 'Interactive Flash Sale & Combo Offer Banners',
    category: 'Promotional Banner',
    description: 'High-contrast promotional hero carousel with countdown timer badges, coupon copy triggers ("50% OFF up to $10"), and single-tap claim CTA buttons.',
    aiInsight: 'Surprising Layout Feature: The AI layout prioritized immediate conversion by placing the flash discount banner directly above restaurant categories, blending marketing with item discovery.',
    highlightCoordinates: { x: 5, y: 28, width: 90, height: 20 },
  },
  {
    id: 'feat-3',
    title: 'Geolocated Near You Cards with ETA & Distance Badges',
    category: 'Featured Restaurants',
    description: 'Dynamic 2-column grid featuring dish thumbnails, restaurant star ratings, estimated preparation times (e.g. 25-35 min), and delivery fee indicators.',
    aiInsight: 'Surprising Layout Feature: The auto-generated layout included micro-status pills (e.g. "Pure Veg", "Bestseller") directly over restaurant cover images to streamline cognitive scanning.',
    highlightCoordinates: { x: 5, y: 52, width: 90, height: 28 },
  },
  {
    id: 'feat-4',
    title: 'Floating Order Cart Bar with Live Order ETA Tracker',
    category: 'Cart & Delivery',
    description: 'Bottom sticky bar displaying item count, subtotal, active restaurant name, and a prominent "Proceed to Checkout" action button.',
    aiInsight: 'Surprising Layout Feature: The AI anticipated user workflow by incorporating a persistent floating cart capsule that maintains state across scrolling sections.',
    highlightCoordinates: { x: 15, y: 84, width: 70, height: 10 },
  },
];

export const MOVIE_PRESETS: MovieCardData[] = [
  {
    id: 'dune-2',
    title: 'Dune: Part Two',
    posterUrl: dunePosterImg,
    rating: 8.9,
    voteCount: '342.5K Votes',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    language: 'English, Hindi, Tamil, Telugu',
    format: '2D, 3D, IMAX 3D, 4DX',
    duration: '2h 46m',
    releaseDate: '1 Mar, 2024',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    rating: 8.9,
    voteCount: '620.1K Votes',
    genre: ['Biography', 'Drama', 'History'],
    language: 'English, Hindi',
    format: '2D, IMAX 70MM, 4DX',
    duration: '3h 00m',
    releaseDate: '21 Jul, 2023',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    posterUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
    rating: 8.7,
    voteCount: '890.4K Votes',
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    language: 'English, Hindi',
    format: '2D, IMAX 2D',
    duration: '2h 49m',
    releaseDate: '7 Nov, 2014',
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
  },
  {
    id: 'spider-verse',
    title: 'Spider-Man: Across the Spider-Verse',
    posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop&q=80',
    rating: 8.8,
    voteCount: '412.8K Votes',
    genre: ['Animation', 'Action', 'Adventure'],
    language: 'English, Hindi, Tamil, Telugu',
    format: '2D, 3D, 4DX',
    duration: '2h 20m',
    releaseDate: '2 Jun, 2023',
    synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.',
  },
];

export const FIGMA_CODE_TEMPLATES: FigmaTemplate[] = [
  {
    id: 'movie-card',
    name: 'BookMyShow Movie Card (Task 4 Standard)',
    category: 'Entertainment UI',
    description: 'Clean BookMyShow movie poster card with title, star rating badge, format tags, and Book Now CTA button.',
    htmlCode: `<div class="bms-card">
  <div class="bms-poster-container">
    <img src="${dunePosterImg}" alt="Dune Part Two Poster" class="bms-poster" />
    <div class="bms-rating-badge">
      <span class="bms-star">★</span>
      <span class="bms-score">8.9/10</span>
      <span class="bms-votes">(342.5K Votes)</span>
    </div>
    <div class="bms-format-tag">In cinemas • IMAX 3D</div>
  </div>
  <div class="bms-details">
    <h3 class="bms-title">Dune: Part Two</h3>
    <p class="bms-genre">Action • Adventure • Sci-Fi</p>
    <div class="bms-meta">
      <span class="bms-lang">UA16+</span>
      <span class="bms-dot">•</span>
      <span class="bms-duration">2h 46m</span>
    </div>
    <button type="button" class="bms-btn">Book Tickets</button>
  </div>
</div>`,
    cssCode: `/* BookMyShow Card Pure CSS - Zero Frameworks */
.bms-card {
  width: 260px;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border: 1px solid #e5e7eb;
}

.bms-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.15);
}

.bms-poster-container {
  position: relative;
  width: 100%;
  height: 360px;
  background-color: #0f172a;
  overflow: hidden;
}

.bms-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.bms-rating-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.7) 70%, transparent);
  color: #ffffff;
  padding: 12px 14px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}

.bms-star {
  color: #f59e0b;
  font-size: 15px;
}

.bms-score {
  font-weight: 700;
  color: #ffffff;
}

.bms-votes {
  font-size: 11px;
  color: #9ca3af;
  margin-left: auto;
}

.bms-format-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(4px);
  color: #f3f4f6;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.bms-details {
  padding: 16px;
  background-color: #ffffff;
}

.bms-title {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bms-genre {
  margin: 0 0 10px 0;
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.bms-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 14px;
}

.bms-btn {
  width: 100%;
  background-color: #f43f5e;
  color: #ffffff;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  box-shadow: 0 2px 4px rgba(244, 63, 94, 0.25);
}

.bms-btn:hover {
  background-color: #e11d48;
}

.bms-btn:active {
  transform: scale(0.98);
}`,
  },
  {
    id: 'food-card',
    name: 'Food Delivery Restaurant Card',
    category: 'E-Commerce',
    description: 'Food item card featuring restaurant thumbnail, delivery time badge, offer tag, and quick order button.',
    htmlCode: `<div class="food-card">
  <div class="food-img-wrapper">
    <img src="${uizardFoodImg}" alt="Gourmet Burger Kitchen" class="food-img" />
    <span class="food-offer">50% OFF up to $10</span>
  </div>
  <div class="food-content">
    <div class="food-header">
      <h4 class="food-title">The Gourmet Burger Lab</h4>
      <span class="food-rating">★ 4.8</span>
    </div>
    <p class="food-cuisines">Burgers • American • Fast Food</p>
    <div class="food-footer">
      <span class="food-time">🕒 25-30 min</span>
      <span class="food-price">$2.99 Delivery</span>
    </div>
  </div>
</div>`,
    cssCode: `.food-card {
  width: 280px;
  background-color: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  font-family: system-ui, sans-serif;
  border: 1px solid #f1f5f9;
}
.food-img-wrapper {
  position: relative;
  height: 160px;
  overflow: hidden;
}
.food-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.food-offer {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 700;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 4px;
}
.food-content {
  padding: 14px;
}
.food-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.food-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}
.food-rating {
  background-color: #15803d;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}
.food-cuisines {
  margin: 6px 0 12px;
  font-size: 12px;
  color: #64748b;
}
.food-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: #334155;
  border-top: 1px dashed #e2e8f0;
  padding-top: 10px;
}`,
  },
];

export const HANDOFF_STEPS: HandoffStep[] = [
  {
    stepNumber: 1,
    title: '1. Figma AI Asset & Design Token Audit',
    summary: 'Analyze Figma AI generated layers, auto-layout constraints, color palettes, and typography tokens.',
    detail: 'Before exporting any code, inspect the Figma file to clean up AI-generated auto-layout groups, standardize variable tokens (colors, spacing, typography scales), and verify layer naming conventions.',
    toolsRecommended: ['Figma Design Tokens', 'Figma Auto Layout Auditor', 'Tokens Studio'],
    bestPractices: [
      'Ensure all frames use Auto Layout (Flexbox logic) rather than absolute positioning.',
      'Define clear color variables for dark/light themes and brand primaries.',
      'Check asset export settings (SVG for icons, 2x PNG/WebP for raster imagery).',
    ],
    codeSnippet: `:root {
  --color-primary: #f43f5e;
  --color-surface: #ffffff;
  --color-text-main: #0f172a;
  --spacing-card-padding: 16px;
  --radius-md: 12px;
}`,
  },
  {
    stepNumber: 2,
    title: '2. Plugin Code Export & Semantic Extraction',
    summary: 'Use dedicated Figma code generation plugins to convert frames into clean, structured HTML & CSS.',
    detail: 'Leverage industry-standard code export tools to transform visual vectors and frames into clean markup. Extract structural flexbox/grid containers while pruning redundant wrapper divs.',
    toolsRecommended: ['Figma to Code (HTML, CSS, React)', 'Anima for Figma', 'Locofy.ai', 'Builder.io Figma Plugin'],
    bestPractices: [
      'Select the target output (Pure HTML/CSS, React + Tailwind, or Vue).',
      'Verify that button elements are generated as real <button> tags instead of <div>s.',
      'Ensure input fields map to semantic <input> or <textarea> elements.',
    ],
    codeSnippet: `<article class="movie-card">
  <img src="poster.jpg" alt="Movie Poster" />
  <h2>Movie Title</h2>
  <button type="button">Book Now</button>
</article>`,
  },
  {
    stepNumber: 3,
    title: '3. Responsive Refactoring & Accessibility Tuning',
    summary: 'Refactor pixel values into relative units (rems/em/%/vw) and add WCAG accessibility attributes.',
    detail: 'Convert hardcoded pixel sizes from Figma (e.g. 360px width) into responsive media queries or fluid CSS clamp() functions. Ensure ARIA labels, image alt tags, and focus states pass WCAG AA standards.',
    toolsRecommended: ['Axe DevTools', 'Chrome Lighthouse', 'Polypane Responsive Viewer'],
    bestPractices: [
      'Replace hardcoded widths with max-width and percentage widths.',
      'Add aria-label to icon-only buttons.',
      'Verify contrast ratios pass minimum 4.5:1 ratio for standard text.',
    ],
    codeSnippet: `.card {
  width: min(100%, 320px);
  margin-inline: auto;
  font-size: clamp(0.875rem, 0.8rem + 0.375vw, 1.125rem);
}`,
  },
  {
    stepNumber: 4,
    title: '4. Component Mapping & Design System Sync',
    summary: 'Map Figma component variants (states, sizes, themes) to clean React/Tailwind props.',
    detail: 'Synchronize design component variants (e.g., Button default, hover, disabled, small, large) with frontend component props or CSS utility classes.',
    toolsRecommended: ['Storybook', 'Figma REST API', 'Tailwind CSS IntelliSense'],
    bestPractices: [
      'Keep prop names identical to Figma variant property names (e.g., variant="primary", size="lg").',
      'Document interactive states (hover, active, disabled, focus-visible) in Storybook.',
    ],
    codeSnippet: `interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}`,
  },
  {
    stepNumber: 5,
    title: '5. Visual Regression & Handoff Sign-off',
    summary: 'Perform pixel-diff verification between original Figma mockups and rendered browser output.',
    detail: 'Overlay rendered HTML/CSS code directly on top of the Figma frame to check for layout shifts, line-height discrepancies, padding errors, or font rendering mismatches.',
    toolsRecommended: ['Chromatic', 'Percy by BrowserStack', 'Pixel Perfect Chrome Extension'],
    bestPractices: [
      'Compare at desktop (1440px), tablet (768px), and mobile (375px) breakpoints.',
      'Run automated visual snapshot diffs before merging code to main branch.',
    ],
    codeSnippet: `/* Cross-browser normalization check */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}`,
  },
];
