/**
 * LogoutButton Component
 * 
 * Generated for React + Firebase Auth + Context API integration.
 * Triggers Firebase signOut() via AuthContext and redirects user cleanly.
 */

import React, { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  className = '', 
  variant = 'compact' 
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (variant === 'full') {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        id="spotify-logout-btn-full"
        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold rounded-full border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer disabled:opacity-50 ${className}`}
        title="Sign out of Spotify"
      >
        {isLoggingOut ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-green-500" />
            <span>Signing out...</span>
          </>
        ) : (
          <>
            <LogOut className="w-4 h-4 text-neutral-300" />
            <span>Log out</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      id="spotify-logout-btn"
      className={`flex items-center gap-2 px-3 py-1.5 bg-black/60 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold rounded-full border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer disabled:opacity-50 ${className}`}
      title="Sign out of Spotify"
    >
      {isLoggingOut ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-green-500" />
      ) : (
        <LogOut className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
      )}
      <span>Log out</span>
    </button>
  );
};
