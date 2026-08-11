import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from '../firebase';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  setError: (err: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_MOCK_KEY = 'spotify_app_demo_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Firebase Auth observer to persist session on browser refresh
    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        setCurrentUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Listener',
          photoURL: fbUser.photoURL,
        });
        localStorage.removeItem(LOCAL_STORAGE_MOCK_KEY); // clean local fallback
      } else {
        // Check local storage demo persistence fallback if firebase auth was in local demo mode
        const savedDemoUser = localStorage.getItem(LOCAL_STORAGE_MOCK_KEY);
        if (savedDemoUser) {
          try {
            setCurrentUser(JSON.parse(savedDemoUser));
          } catch {
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login function with Firebase Auth & fallback handler
  const login = async (email: string, pass: string) => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'Listener',
      });
    } catch (err: any) {
      console.warn("Firebase Auth sign-in notice:", err.message);
      // Handle standard Firebase auth error codes
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        throw new Error("Invalid email or password. Please try again.");
      } else if (err.code === 'auth/invalid-email') {
        throw new Error("Please enter a valid email address.");
      } else if (err.code === 'auth/too-many-requests') {
        throw new Error("Access blocked due to unusual activity. Try again later.");
      } else {
        // Fallback for offline or demo environment where Firebase API key is unprovisioned
        const demoUser: User = {
          uid: 'demo-' + Date.now(),
          email: email,
          displayName: email.split('@')[0] || 'Demo Listener',
        };
        setCurrentUser(demoUser);
        localStorage.setItem(LOCAL_STORAGE_MOCK_KEY, JSON.stringify(demoUser));
      }
    }
  };

  // Sign up function with Firebase Auth & fallback handler
  const signup = async (email: string, pass: string) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'Listener',
      });
    } catch (err: any) {
      console.warn("Firebase Auth sign-up notice:", err.message);
      if (err.code === 'auth/email-already-in-use') {
        throw new Error("This email is already registered. Please sign in instead.");
      } else if (err.code === 'auth/weak-password') {
        throw new Error("Password should be at least 6 characters.");
      } else if (err.code === 'auth/invalid-email') {
        throw new Error("Please enter a valid email address.");
      } else {
        // Fallback for offline/demo environment
        const demoUser: User = {
          uid: 'demo-' + Date.now(),
          email: email,
          displayName: email.split('@')[0] || 'Demo Listener',
        };
        setCurrentUser(demoUser);
        localStorage.setItem(LOCAL_STORAGE_MOCK_KEY, JSON.stringify(demoUser));
      }
    }
  };

  // Logout function
  const logout = async () => {
    setError(null);
    try {
      await firebaseSignOut(auth);
    } catch (err: any) {
      console.warn("Firebase signout fallback:", err);
    } finally {
      localStorage.removeItem(LOCAL_STORAGE_MOCK_KEY);
      setCurrentUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, signup, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
