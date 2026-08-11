import React from 'react';
import { Home, ShoppingBag, ShoppingCart, User, MapPin, Search, ChevronDown, UtensilsCrossed } from 'lucide-react';
import { NavLinkItem } from '../types';

interface NavbarProps {
  /** Currently active link ID */
  activeLink: string;
  /** Callback fired when user selects a link */
  onLinkChange: (linkId: string) => void;
  /** Number of items in cart */
  cartCount?: number;
  /** Delivery location label */
  location?: string;
  /** Search query state */
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const NAV_ITEMS: NavLinkItem[] = [
  { id: 'Home', label: 'Home', iconName: 'Home' },
  { id: 'Orders', label: 'Orders', iconName: 'ShoppingBag', badge: 2 },
  { id: 'Cart', label: 'Cart', iconName: 'ShoppingCart', badge: 3 },
  { id: 'Profile', label: 'Profile', iconName: 'User' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeLink,
  onLinkChange,
  cartCount = 3,
  location = 'Connaught Place, New Delhi',
  searchQuery = '',
  onSearchChange,
}) => {
  const getIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-red-600' : 'text-slate-600 group-hover:text-slate-900'}`;
    switch (iconName) {
      case 'Home':
        return <Home className={iconClass} />;
      case 'ShoppingBag':
        return <ShoppingBag className={iconClass} />;
      case 'ShoppingCart':
        return <ShoppingCart className={iconClass} />;
      case 'User':
        return <User className={iconClass} />;
      default:
        return <Home className={iconClass} />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              id="zomato-brand-btn"
              onClick={() => onLinkChange('Home')}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-200 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black italic tracking-tight text-slate-900 font-sans">
                  zomato
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest font-bold text-red-600 ml-1.5 px-1.5 py-0.5 bg-red-50 border border-red-100 rounded-md">
                  Delivery
                </span>
              </div>
            </button>

            {/* Location Selector */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-xs font-medium text-slate-700 cursor-pointer transition-colors">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span className="max-w-[160px] truncate">{location}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md items-center relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search for restaurant, cuisine or a dish..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>

          {/* Navigation Links with Active Prop Highlighting */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeLink.toLowerCase() === item.id.toLowerCase();
              const badgeValue = item.id === 'Cart' ? cartCount : item.badge;

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id.toLowerCase()}`}
                  onClick={() => onLinkChange(item.id)}
                  className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all group focus:outline-none ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="relative">
                    {getIcon(item.iconName, isActive)}
                    {badgeValue && badgeValue > 0 ? (
                      <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-600 rounded-full shadow-xs border-2 border-white">
                        {badgeValue}
                      </span>
                    ) : null}
                  </div>
                  <span className="hidden md:inline-block">{item.label}</span>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-full md:hidden" />
                  )}
                </button>
              );
            })}
          </nav>

        </div>
      </div>
    </header>
  );
};
