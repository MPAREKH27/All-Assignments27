import { Restaurant, Track, Playlist, UserJourneyStep, MovieShow, CartItem, JobProfileData, CredRewardsData } from '../types';

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'r1',
    name: 'Truffles Bistro',
    cuisine: 'American, Burgers, Shakes',
    rating: 4.8,
    deliveryTime: '25-30 min',
    priceForTwo: '₹500 for two',
    offer: '60% OFF up to ₹120',
    wireframeTag: '[IMG_BOX_HERO]',
    isPromoted: true
  },
  {
    id: 'r2',
    name: 'Punjab Grill Express',
    cuisine: 'North Indian, Kebabs, Biryani',
    rating: 4.6,
    deliveryTime: '35-40 min',
    priceForTwo: '₹700 for two',
    offer: 'Flat ₹150 OFF on ₹399+',
    wireframeTag: '[IMG_CARD_2]'
  },
  {
    id: 'r3',
    name: 'Ramen & Bao House',
    cuisine: 'Asian, Japanese, Dumplings',
    rating: 4.9,
    deliveryTime: '20-25 min',
    priceForTwo: '₹850 for two',
    offer: 'Free Appetizer on ₹599+',
    wireframeTag: '[IMG_CARD_3]',
    isPromoted: true
  },
  {
    id: 'r4',
    name: 'Pizza Napoletana',
    cuisine: 'Italian, Woodfired Pizza, Pasta',
    rating: 4.5,
    deliveryTime: '30-35 min',
    priceForTwo: '₹600 for two',
    offer: '50% OFF using PayUPI',
    wireframeTag: '[IMG_CARD_4]'
  }
];

export const MUSIC_TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Midnight City Lights',
    artist: 'Synthetica & The Neon Club',
    album: 'Nocturnal Echoes',
    duration: 218, // 3:38
    coverColor: 'from-purple-600 to-indigo-900',
    isLiked: true,
    lyrics: [
      "Cruising down the neon avenue",
      "City lights flashing red and blue",
      "The bassline pulse underneath the street",
      "Lost in the rhythmic summer heat",
      "Hold on to the night before it fades away..."
    ]
  },
  {
    id: 't2',
    title: 'Acoustic Sunrise',
    artist: 'Maya Lin',
    album: 'Morning Coffee Solitude',
    duration: 185, // 3:05
    coverColor: 'from-amber-500 to-orange-700',
    isLiked: true,
    lyrics: [
      "Sunlight breaking through the blinds",
      "Leaving yesterday behind",
      "Soft chords drifting through the air",
      "Moments that we used to share..."
    ]
  },
  {
    id: 't3',
    title: 'Cyberpunk Odyssey 2099',
    artist: 'Vapor Wave Project',
    album: 'Future Horizon',
    duration: 275, // 4:35
    coverColor: 'from-cyan-500 to-emerald-900',
    isLiked: false,
    lyrics: [
      "Signals in the digital rain",
      "Rewiring the pleasure and pain",
      "Electric pulse in synthetic veins",
      "Nothing ever stays the same..."
    ]
  },
  {
    id: 't4',
    title: 'Chill Lo-Fi Rain',
    artist: 'BeatMaker 404',
    album: 'Study Beats Vol. 3',
    duration: 162, // 2:42
    coverColor: 'from-slate-600 to-zinc-900',
    isLiked: true,
    lyrics: [
      "(Instrumental Ambient Lo-Fi Beats)",
      "Raindrops softly falling outside",
      "A warm cup of tea by your side",
      "(Vinyl Crackle)"
    ]
  }
];

export const PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Top Hits 2026',
    description: 'The hottest trending tracks across the globe right now.',
    tracksCount: 50,
    coverGradient: 'from-emerald-400 to-teal-800'
  },
  {
    id: 'p2',
    name: 'Late Night Coding Beats',
    description: 'Deep focus instrumentals, synthwave & chill ambient.',
    tracksCount: 38,
    coverGradient: 'from-purple-600 to-blue-900'
  },
  {
    id: 'p3',
    name: 'Indie Acoustic Chill',
    description: 'Warm acoustic guitars, soothing vocals and peaceful vibes.',
    tracksCount: 24,
    coverGradient: 'from-amber-600 to-rose-900'
  }
];

export const MOVIE_JOURNEY_STEPS: UserJourneyStep[] = [
  {
    id: 1,
    stageName: '1. Discovery & App Launch',
    screenTitle: 'Home & Location Selection',
    userGoal: 'Quickly find trending movies near my location with filters.',
    emotionScore: 4,
    keyTouchpoints: ['City Selector Popup', 'Now Showing Banner Carousel', 'Genre Pills Filter'],
    frictionPoints: ['Too many popup promo banners', 'Location permission delay'],
    designSolution: 'Auto-detect location with instant edit option; prominent high-rated movie hero cards.',
    activeScreenComponent: 'HomeScreen'
  },
  {
    id: 2,
    stageName: '2. Movie Details & Cinema',
    screenTitle: 'Movie Info & Showtimes',
    userGoal: 'Check ratings, trailer, format (IMAX 3D), cinema distance, and slot timings.',
    emotionScore: 4.5,
    keyTouchpoints: ['Trailer Play Button', 'Cinema Name & Distance', 'Showtime Chips (Green = Available)'],
    frictionPoints: ['Confusing audio language tags (English vs Hindi 3D)', 'Sold out slot confusion'],
    designSolution: 'Clear tag badges for Dolby Atmos / IMAX and color-coded seat availability indicators.',
    activeScreenComponent: 'MovieDetailScreen'
  },
  {
    id: 3,
    stageName: '3. Interactive Seat Selection',
    screenTitle: 'Theatre Layout & Seat Matrix',
    userGoal: 'Pick preferred seating layout (Recliner, Prime, Classic) with clear price badges.',
    emotionScore: 3.8,
    keyTouchpoints: ['Screen Direction Arc', 'Interactive Grid', 'Selected Seat Price Summary CTA'],
    frictionPoints: ['Accidentally picking separated seats', 'Unclear screen orientation'],
    designSolution: 'Glow screen curved indicator, auto-grouping adjacent seat selection, price tier key.',
    activeScreenComponent: 'SeatSelectionScreen'
  },
  {
    id: 4,
    stageName: '4. F&B Snacks Add-ons',
    screenTitle: 'Popcorn & Drinks Combo',
    userGoal: 'Add snacks to ticket or skip seamlessly without invasive lockups.',
    emotionScore: 3.5,
    keyTouchpoints: ['Popcorn Combo Cards', 'Counter Plus/Minus', 'Skip & Proceed CTA'],
    frictionPoints: ['Forced popups stalling checkout', 'High snack prices frustration'],
    designSolution: 'Non-intrusive bottom sheet with explicit "Skip to Payment" secondary button.',
    activeScreenComponent: 'SnacksScreen'
  },
  {
    id: 5,
    stageName: '5. Fast Express Payment',
    screenTitle: 'Checkout & Offers Summary',
    userGoal: 'Apply promo coupon / credit card cashback and complete 1-tap UPI payment.',
    emotionScore: 4.2,
    keyTouchpoints: ['Bank Offer Accordion', 'Order Breakdown', 'Pay UPI / Card CTA'],
    frictionPoints: ['Hidden convenience fee surprises', 'Timer expiry stress'],
    designSolution: 'Transparent breakdown showing fee upfront; prominent discount coupon applicator.',
    activeScreenComponent: 'PaymentScreen'
  },
  {
    id: 6,
    stageName: '6. Ticket Confirmation',
    screenTitle: 'Digital M-Ticket & QR Code',
    userGoal: 'Receive instant gate entry QR code, add to Google Wallet, and get show directions.',
    emotionScore: 5.0,
    keyTouchpoints: ['High-contrast Entry QR', 'Showtime Countdown', 'Calendar Sync & Share Ticket'],
    frictionPoints: ['No offline ticket access', 'Unclear theatre entry gate'],
    designSolution: 'Offline downloadable image pass, Gate # details, and 1-tap WhatsApp share.',
    activeScreenComponent: 'TicketConfirmationScreen'
  }
];

export const MOVIE_DATA: MovieShow = {
  id: 'm101',
  title: 'Dune: Part Two (IMAX 3D)',
  genre: 'Sci-Fi / Action',
  rating: '4.8/5 (120K Votes)',
  language: 'English (Dolby Atmos)',
  duration: '2h 46m',
  posterColor: 'from-amber-700 via-orange-600 to-stone-900',
  theater: 'PVR IMAX, Orion Mall, Bengaluru',
  showtime: '07:30 PM (Today)'
};

export const CART_ITEMS_DATA: CartItem[] = [
  {
    id: 'c1',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)',
    seller: 'Appario Retail Pvt Ltd',
    price: 26990,
    originalPrice: 34990,
    discountPct: 22,
    quantity: 1,
    imageBg: 'from-slate-700 to-slate-900',
    deliveryDate: 'Delivery by Tomorrow, 5 PM',
    inStock: true
  },
  {
    id: 'c2',
    title: 'Spigen Tough Armor Case for iPhone 15 Pro Max',
    seller: 'Spigen Official Store',
    price: 1899,
    originalPrice: 2999,
    discountPct: 36,
    quantity: 1,
    imageBg: 'from-zinc-800 to-black',
    deliveryDate: 'Delivery by Thursday',
    inStock: true
  },
  {
    id: 'c3',
    title: 'Anker PowerCore 20,000mAh 65W Fast Charging Power Bank',
    seller: 'Anker Direct',
    price: 3499,
    originalPrice: 4999,
    discountPct: 30,
    quantity: 1,
    imageBg: 'from-blue-800 to-indigo-950',
    deliveryDate: 'Delivery by Tomorrow, 5 PM',
    inStock: true
  }
];

export const JOB_PROFILE_DATA: JobProfileData = {
  name: 'Aarav Sharma',
  title: 'Senior Product Designer',
  company: 'Fintech Corp India',
  experience: '6+ Years Experience',
  location: 'Bengaluru, India',
  skills: ['Figma AI', 'Design Systems', 'Micro-Interactions', 'User Research', 'Prototyping', 'Tailwind CSS'],
  stats: [
    { label: 'Profile Views', value: '2,480' },
    { label: 'Search Appearances', value: '640' },
    { label: 'Recruiter Inquiries', value: '18' }
  ],
  recentProjects: [
    { name: 'UPI 2.0 Auto-pay Redesign', role: 'Lead UX Designer', date: 'Jan 2026' },
    { name: 'Design System 3.0 Tokens', role: 'System Architect', date: 'Nov 2025' }
  ]
};

export const CRED_REWARDS_DATA: CredRewardsData = {
  userName: 'AARAV SHARMA',
  credCoins: 148500,
  creditScore: 824,
  tier: 'CRED BLACK MEMBER',
  perks: [
    {
      id: 'p1',
      title: 'Flat ₹500 Cashback on Amazon Shopping',
      brand: 'AMAZON PAY',
      discount: 'Claim with 25,000 Coins',
      coinCost: 25000,
      bgGradient: 'from-amber-900 via-yellow-700 to-amber-950'
    },
    {
      id: 'p2',
      title: 'Free Culinary Tasting Menu for 2',
      brand: 'TAJ HOTELS',
      discount: 'Claim with 50,000 Coins',
      coinCost: 50000,
      bgGradient: 'from-slate-900 via-neutral-800 to-black'
    },
    {
      id: 'p3',
      title: '15% Extra Off Luxury Watches',
      brand: 'ETHOS WATCHES',
      discount: 'Claim with 15,000 Coins',
      coinCost: 15000,
      bgGradient: 'from-purple-950 via-zinc-900 to-black'
    }
  ],
  upcomingBills: [
    { title: 'HDFC Regalia Credit Card', amount: '₹42,850', dueDate: 'Due in 3 days' },
    { title: 'ICICI Saphiro Credit Card', amount: '₹18,200', dueDate: 'Due in 8 days' }
  ]
};
