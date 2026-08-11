export type AssignmentTab = 
  | 'food-lofi'
  | 'music-hifi'
  | 'movie-journey'
  | 'cart-uizard'
  | 'cred-transform';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceForTwo: string;
  offer: string;
  wireframeTag: string;
  isPromoted?: boolean;
}

export interface OrderStatus {
  step: number;
  title: string;
  time: string;
  description: string;
  isDone: boolean;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverColor: string;
  coverImage?: string;
  isLiked: boolean;
  lyrics: string[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracksCount: number;
  coverGradient: string;
}

export interface UserJourneyStep {
  id: number;
  stageName: string;
  screenTitle: string;
  userGoal: string;
  emotionScore: number; // 1 to 5
  keyTouchpoints: string[];
  frictionPoints: string[];
  designSolution: string;
  activeScreenComponent: string;
}

export interface MovieShow {
  id: string;
  title: string;
  genre: string;
  rating: string;
  language: string;
  duration: string;
  posterColor: string;
  theater: string;
  showtime: string;
}

export interface Seat {
  id: string;
  row: string;
  num: number;
  category: 'Recliner' | 'Prime' | 'Classic';
  price: number;
  isBooked: boolean;
  isSelected?: boolean;
}

export interface CartItem {
  id: string;
  title: string;
  seller: string;
  price: number;
  originalPrice: number;
  discountPct: number;
  quantity: number;
  imageBg: string;
  deliveryDate: string;
  inStock: boolean;
}

export interface JobProfileData {
  name: string;
  title: string;
  company: string;
  experience: string;
  location: string;
  skills: string[];
  stats: { label: string; value: string }[];
  recentProjects: { name: string; role: string; date: string }[];
}

export interface CredRewardsData {
  userName: string;
  credCoins: number;
  creditScore: number;
  tier: string;
  perks: { id: string; title: string; brand: string; discount: string; coinCost: number; bgGradient: string }[];
  upcomingBills: { title: string; amount: string; dueDate: string }[];
}
