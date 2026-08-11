import React from 'react';
import { Search, User as UserIcon, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LogoutButton } from './LogoutButton';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  searchQuery,
  setSearchQuery,
}) => {
  const { currentUser } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-black/80 backdrop-blur-md px-6 flex items-center justify-between border-b border-neutral-900/60">
      {/* Navigation Arrows & Search Input */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button 
            className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            title="Go forward"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {activeTab === 'search' && (
          <div className="relative w-64 md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to play?"
              className="w-full bg-neutral-800 text-white text-sm pl-9 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-neutral-400 transition"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* User Info & Email Display (Requirement 2) & Logout Button (Requirement 5) */}
      <div className="flex items-center gap-3">
        {currentUser && (
          <>
            {/* User Session Email Badge */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-neutral-900/90 border border-neutral-800 rounded-full hover:border-neutral-700 transition group">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center text-black font-bold text-xs shadow-sm">
                {currentUser.email ? currentUser.email[0].toUpperCase() : <UserIcon className="w-3 h-3" />}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-wide max-w-[160px] md:max-w-[220px] truncate" id="user-email-header">
                  {currentUser.email}
                </span>
                <span className="text-[10px] text-green-400 font-medium leading-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Spotify Premium
                </span>
              </div>
            </div>

            {/* ChatGPT Generated Logout Button Component */}
            <LogoutButton variant="compact" />
          </>
        )}
      </div>
    </header>
  );
};
