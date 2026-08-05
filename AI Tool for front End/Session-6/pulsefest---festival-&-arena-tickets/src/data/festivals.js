import { Festival, TicketTier } from '../types';

export const FESTIVAL_CATEGORIES = [
  'All Festivals',
  'EDM Arena',
  'Bollywood Stadium',
  'Hip-Hop Clash',
  'Rock Arena',
  'VIP Experience'
];

export const CITIES = [
  'All Cities',
  'Mumbai',
  'Bengaluru',
  'Delhi NCR',
  'Goa',
  'Hyderabad',
  'Pune'
];

export const FESTIVALS_DATA: Festival[] = [
  {
    id: 'fest-01',
    title: 'SUNBURN STADIUM ARENA 2026',
    tagline: 'The Ultimate Nightlife Stadium Showdown',
    category: 'EDM Arena',
    city: 'Mumbai',
    venue: 'DY Patil Stadium, Navi Mumbai',
    date: 'OCT 24-26, 2026',
    time: '4:00 PM ONWARDS',
    heroImage: '/hero-image.png',
    startingPrice: 1999,
    featuredHeadliners: ['DJ Snake', 'Martin Garrix', 'Nucleya', 'KSHMR'],
    roarLevel: 98,
    ticketsRemaining: 142,
    iplMatchVibeTag: '🔥 STADIUM SOLD OUT 94%',
    isSellingFast: true,
  },
  {
    id: 'fest-02',
    title: 'BOLLYWOOD SUPER BOWL NIGHT',
    tagline: 'High Octane Desi Beats & Pyrotechnics',
    category: 'Bollywood Stadium',
    city: 'Delhi NCR',
    venue: 'Jawaharlal Nehru Stadium',
    date: 'NOV 12, 2026',
    time: '6:00 PM ONWARDS',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 1499,
    featuredHeadliners: ['Arijit Singh Live', 'Badshah Arena', 'Jonita Gandhi'],
    roarLevel: 95,
    ticketsRemaining: 320,
    iplMatchVibeTag: '⚡ MATCHDAY STAGE VIBES',
    isSellingFast: true,
  },
  {
    id: 'fest-03',
    title: 'BASS NATION IPL ARENA CLASH',
    tagline: 'Hip-Hop Soundclash Under Stadium Lights',
    category: 'Hip-Hop Clash',
    city: 'Bengaluru',
    venue: 'Chinnaswamy Stadium Enclosure',
    date: 'DEC 05, 2026',
    time: '5:30 PM ONWARDS',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 1299,
    featuredHeadliners: ['Divine', 'Raftaar', 'MC Stan', 'Prabh Deep'],
    roarLevel: 92,
    ticketsRemaining: 88,
    iplMatchVibeTag: '💥 FAN PIT ALMOST FULL',
    isSellingFast: true,
  },
  {
    id: 'fest-04',
    title: 'GOA ELECTRIC BEACH CARNIVAL',
    tagline: '3 Days of Sunset Stage & Neon Pyros',
    category: 'EDM Arena',
    city: 'Goa',
    venue: 'Vagator Beach Arena',
    date: 'DEC 28-30, 2026',
    time: '3:00 PM ONWARDS',
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 2499,
    featuredHeadliners: ['Armin van Buuren', 'Lost Frequencies', 'Ritviz'],
    roarLevel: 99,
    ticketsRemaining: 410,
    iplMatchVibeTag: '🌊 BEACH ARENA MASSIVE HYPE',
    isSellingFast: false,
  },
  {
    id: 'fest-05',
    title: 'HYDERABAD ROCK THUNDER',
    tagline: 'Heavy Guitar Riffs & Stadium Pyrotechnics',
    category: 'Rock Arena',
    city: 'Hyderabad',
    venue: 'Gachibowli Stadium Ground',
    date: 'JAN 15, 2027',
    time: '6:30 PM ONWARDS',
    heroImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 999,
    featuredHeadliners: ['Local Train', 'Indian Ocean', 'Parvaaz', 'Bloodywood'],
    roarLevel: 89,
    ticketsRemaining: 550,
    iplMatchVibeTag: '⚡ THUNDER STAGE',
    isSellingFast: false,
  },
  {
    id: 'fest-06',
    title: 'IPL SKYBOX VIP MUSIC LOUNGE',
    tagline: 'Ultra Premium Skybox Access & All-Inclusive Bar',
    category: 'VIP Experience',
    city: 'Mumbai',
    venue: 'Wankhede VIP Pavilion Arena',
    date: 'NOV 20, 2026',
    time: '7:00 PM ONWARDS',
    heroImage: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 7999,
    featuredHeadliners: ['Global DJ Showcase', 'Celebrity Meet & Greet'],
    roarLevel: 97,
    ticketsRemaining: 24,
    iplMatchVibeTag: '👑 VIP SKYBOX LIMITED',
    isSellingFast: true,
  }
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'tier-general',
    name: 'General Stand (East/West)',
    description: 'High view of main stage, stadium screen access, entry to food court',
    price: 1999,
    color: 'border-zinc-700 bg-zinc-900/80 text-zinc-100',
    perks: ['Standard Arena Entry', 'Food & Beverage Zone Access', 'HD Screen Visibility'],
    availableSeats: 450,
    stadiumZone: 'East Stand Lower Tier'
  },
  {
    id: 'tier-gold',
    name: 'Gold Enclosure (Stage Front)',
    description: 'Close proximity to DJ booth, laser zone, quick F&B counter access',
    price: 3499,
    color: 'border-amber-500/50 bg-amber-500/10 text-amber-200',
    perks: ['Fast Track Entry', 'Stage Front Fan Pit View', 'Complimentary LED Wristband', 'Express Bar Line'],
    availableSeats: 120,
    stadiumZone: 'Gold Pit Front Left'
  },
  {
    id: 'tier-fanpit',
    name: 'IPL Fan Pit (Front Stage Center)',
    description: 'Unmatched explosive atmosphere, confetti cannons, flame pyros front row',
    price: 4999,
    color: 'border-red-500/50 bg-red-500/10 text-red-200',
    perks: ['Prime Center Stage Front', 'Exclusive Fan Pit Wristband', 'Priority Entry Gate 2', '2x Free Drink Vouchers'],
    availableSeats: 45,
    stadiumZone: 'Center Stage Pit'
  },
  {
    id: 'tier-skybox',
    name: 'IPL VIP Skybox Pavilion',
    description: 'Air-conditioned luxury lounge, unlimited gourmet buffet, premium seating',
    price: 8999,
    color: 'border-yellow-400 bg-yellow-400/10 text-yellow-300',
    perks: ['Private Air-Conditioned Suite', 'Unlimited Gourmet Buffet', 'Dedicated Hostess Service', 'Artist Meet & Greet Pass'],
    availableSeats: 12,
    stadiumZone: 'Level 3 Corporate Skybox 14'
  }
];

export const ADDONS = [
  { id: 'addon-1', name: 'IPL Festival Glow Band & Merch Kit', price: 499 },
  { id: 'addon-2', name: 'Express VIP Gate Entry Pass', price: 299 },
  { id: 'addon-3', name: 'Unlimited Energy Drink Voucher', price: 699 }
];
