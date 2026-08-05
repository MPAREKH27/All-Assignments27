export interface Festival {
  id: string;
  title: string;
  tagline: string;
  category: 'EDM Arena' | 'Bollywood Stadium' | 'Hip-Hop Clash' | 'Rock Arena' | 'VIP Experience';
  city: string;
  venue: string;
  date: string;
  time: string;
  heroImage: string;
  startingPrice: number;
  featuredHeadliners: string[];
  roarLevel: number; // IPL style hype roar 0-100%
  ticketsRemaining: number;
  iplMatchVibeTag: string;
  isSellingFast?: boolean;
}

export interface TicketTier {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  perks: string[];
  availableSeats: number;
  stadiumZone: string;
}

export interface BookingDetails {
  festival: Festival;
  tier: TicketTier;
  quantity: number;
  selectedSeats: string[];
  addons: string[];
  totalAmount: number;
}
