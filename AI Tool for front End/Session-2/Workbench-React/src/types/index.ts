export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

export interface Playlist {
  id: string;
  name: string;
  creator: string;
  songCount: number;
  coverUrl: string;
  genre: string;
  likes: number;
  songs: Song[];
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  inStock: boolean;
  deliveryTime: string;
  brand: string;
  tag?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  deliveryTimeMinutes: number;
  priceForTwo: number;
  imageUrl: string;
  featuredDish: string;
  offer: string;
  location: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  channelName: string;
  views: string;
  uploadedAgo: string;
  thumbnailUrl: string;
  duration: string;
  youtubeId: string;
}

export type CodeFormat = 'jsx' | 'js' | 'tsx';
