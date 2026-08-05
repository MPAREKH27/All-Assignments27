import { Playlist, Product, Restaurant, YouTubeVideo } from '../types';

export const INITIAL_PLAYLIST: Playlist = {
  id: 'pl-101',
  name: 'Lo-Fi Chill Beats for Coding',
  creator: 'Aesthetic Melodies',
  songCount: 24,
  coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
  genre: 'Lo-Fi / Instrumental',
  likes: 14280,
  songs: [
    { id: 's1', title: 'Midnight Coffee & Syntax', artist: 'LoFi Dreamer', duration: '2:45' },
    { id: 's2', title: 'Rainy Terminal Windows', artist: 'ByteWave', duration: '3:12' },
    { id: 's3', title: 'Async Dreams', artist: 'Chillhop Academy', duration: '2:58' },
    { id: 's4', title: 'React State of Mind', artist: 'Pixel Symphony', duration: '3:05' },
    { id: 's5', title: 'Compiler Serenade', artist: 'Aesthetic Melodies', duration: '2:30' },
  ]
};

export const SAMPLE_PLAYLISTS: Playlist[] = [
  INITIAL_PLAYLIST,
  {
    id: 'pl-102',
    name: 'Bollywood Acoustic Vibes',
    creator: 'Melody Junction',
    songCount: 42,
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    genre: 'Acoustic / Indian Indie',
    likes: 28910,
    songs: [
      { id: 's10', title: 'Tum Se Hi (Unplugged)', artist: 'Mohit Chauhan', duration: '4:15' },
      { id: 's11', title: 'Kabira Acoustic', artist: 'Arijit Singh', duration: '3:45' },
      { id: 's12', title: 'Iktara Acoustic Cover', artist: 'Kavita Seth', duration: '4:02' }
    ]
  },
  {
    id: 'pl-103',
    name: 'Synthwave Neon Drive 80s',
    creator: 'CyberRunner',
    songCount: 35,
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    genre: 'Synthwave / Electronic',
    likes: 9540,
    songs: [
      { id: 's20', title: 'Midnight City Sunset', artist: 'Retro Boy', duration: '4:30' },
      { id: 's21', title: 'Neon Highway', artist: 'Kavinsky Vibe', duration: '3:50' }
    ]
  }
];

export const FLIPKART_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    title: 'Noise ColorFit Pulse 2 Max Smartwatch (1.85" Display, Bluetooth Calling, Jet Black)',
    price: 1499,
    originalPrice: 5999,
    discountPercent: 75,
    rating: 4.3,
    reviewCount: 84290,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    deliveryTime: 'Free Delivery by Tomorrow',
    brand: 'Noise',
    tag: 'Bestseller'
  },
  {
    id: 'prod-102',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Active Noise Canceling Headphones',
    price: 29990,
    originalPrice: 34990,
    discountPercent: 14,
    rating: 4.7,
    reviewCount: 12450,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    deliveryTime: 'Free Delivery by Friday',
    brand: 'Sony',
    tag: 'Assured'
  },
  {
    id: 'prod-103',
    title: 'Apple iPad Air (5th Gen) 64 GB ROM 10.9 inch Wi-Fi Only (Space Grey)',
    price: 54900,
    originalPrice: 59900,
    discountPercent: 8,
    rating: 4.8,
    reviewCount: 3820,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    inStock: false,
    deliveryTime: 'Currently Out of Stock',
    brand: 'Apple',
    tag: 'Top Rated'
  }
];

export const ZOMATO_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Punjab Grill & Tandoor',
    cuisine: ['North Indian', 'Mughlai', 'Kebab'],
    rating: 4.4,
    deliveryTimeMinutes: 28,
    priceForTwo: 600,
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    featuredDish: 'Dal Makhani & Butter Naan',
    offer: '50% OFF up to ₹100',
    location: 'Connaught Place, New Delhi'
  },
  {
    id: 'rest-2',
    name: 'Truffles Bistro & Burgers',
    cuisine: ['American', 'Burgers', 'Fast Food', 'Shakes'],
    rating: 4.6,
    deliveryTimeMinutes: 22,
    priceForTwo: 450,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    featuredDish: 'Smoky BBQ Cheese Burger',
    offer: '60% OFF using ZOMPAY',
    location: 'Koramangala, Bengaluru'
  },
  {
    id: 'rest-3',
    name: 'Wok Hei Chinese Kitchen',
    cuisine: ['Chinese', 'Asian', 'Dim Sum', 'Noodles'],
    rating: 4.2,
    deliveryTimeMinutes: 35,
    priceForTwo: 500,
    imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
    featuredDish: 'Schezwan Hakka Noodles',
    offer: 'Flat ₹125 OFF',
    location: 'Bandra West, Mumbai'
  },
  {
    id: 'rest-4',
    name: 'Nizam Biryani House',
    cuisine: ['Hyderabadi', 'Biryani', 'Kebabs'],
    rating: 4.5,
    deliveryTimeMinutes: 25,
    priceForTwo: 400,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    featuredDish: 'Hyderabadi Dum Biryani',
    offer: 'Free Dessert on orders > ₹399',
    location: 'Jubilee Hills, Hyderabad'
  }
];

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: 'yt-1',
    title: 'React 19 Complete Crash Course in 1 Hour - Hooks, Server Components & Actions',
    channelName: 'CodeWithJS',
    views: '1.2M views',
    uploadedAgo: '3 weeks ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
    duration: '58:24',
    youtubeId: 'LDB4uaJ87e0'
  },
  {
    id: 'yt-2',
    title: 'Mastering GitHub Copilot in VS Code - Speed Up Your Frontend Workflow 10x',
    channelName: 'DevTips Pro',
    views: '480K views',
    uploadedAgo: '2 months ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80',
    duration: '18:15',
    youtubeId: 'Fi3AJZZregI'
  },
  {
    id: 'yt-3',
    title: 'Custom Hooks in React Explained with Real World Examples (useFetch & useLocalStorage)',
    channelName: 'WebDev Simplified',
    views: '890K views',
    uploadedAgo: '5 months ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    duration: '24:10',
    youtubeId: '0c_iqS38y64'
  },
  {
    id: 'yt-4',
    title: 'ChatGPT for Developers: How to Prompt AI to Debug React Errors like a Senior Engineer',
    channelName: 'Tech Lead Daily',
    views: '320K views',
    uploadedAgo: '1 month ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
    duration: '14:45',
    youtubeId: 'SqcY0GlETPk'
  }
];
