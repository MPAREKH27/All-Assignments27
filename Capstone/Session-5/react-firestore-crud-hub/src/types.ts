export interface Playlist {
  id: string;
  name: string;
  songTitles: string[];
  description?: string;
  coverGradient?: string;
  createdAt?: any;
}

export interface RestaurantReview {
  id: string;
  restaurantName: string;
  rating: number; // 1 to 5
  comment: string;
  cuisine?: string;
  createdAt?: any;
}

export interface WatchlistItem {
  id: string;
  movieName: string;
  status: 'watched' | 'not watched';
  genre?: string;
  releaseYear?: number;
  addedAt?: any;
}
