import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Music2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-black font-bold shadow-lg shadow-green-500/20">
            <Music2 className="w-9 h-9 animate-bounce" />
          </div>
          <p className="text-sm font-medium text-neutral-400 tracking-wider uppercase">Loading Spotify Session...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login page and save location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
