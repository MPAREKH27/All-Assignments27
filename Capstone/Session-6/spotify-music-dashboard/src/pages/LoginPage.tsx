import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Disc, Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, signup, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const from = location.state?.from?.pathname || '/';

  // If already logged in, redirect immediately
  React.useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick Demo Login Helper
  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('spotify2026!');
    setErrorMessage(null);
    try {
      setIsSubmitting(true);
      await login(demoEmail, 'spotify2026!');
      navigate(from, { replace: true });
    } catch (err: any) {
      // Fallback handles demo creation automatically
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Decorative Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Spotify Brand Header */}
      <div className="flex items-center gap-3 mb-8 z-10">
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black shadow-xl shadow-green-500/20">
          <Disc className="w-7 h-7 animate-spin-slow" />
        </div>
        <span className="text-3xl font-black text-white tracking-tight">Spotify</span>
      </div>

      {/* Main Form Container Card */}
      <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-white tracking-tight">
            {isSignUp ? 'Create your Spotify account' : 'Log in to Spotify'}
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-medium">
            {isSignUp
              ? 'Sign up to start listening to millions of songs.'
              : 'Enter your credentials to access your personalized music dashboard.'}
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-red-950/80 border border-red-800/80 rounded-xl flex items-start gap-3 text-red-200 text-xs font-medium animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="flex-1">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                id="login-email-input"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 text-white text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all placeholder-neutral-600 font-medium"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                id="login-password-input"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 text-white text-sm pl-10 pr-10 py-3 rounded-xl focus:outline-none transition-all placeholder-neutral-600 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            id="login-submit-btn"
            className="w-full mt-2 py-3.5 px-4 bg-green-500 hover:bg-green-400 active:scale-[0.99] text-black font-extrabold text-sm rounded-full shadow-lg shadow-green-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-black" />
                <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
              </>
            ) : (
              <>
                <span>{isSignUp ? 'Sign Up' : 'Log In'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Login / Sign Up */}
        <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-400 font-medium">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMessage(null);
              }}
              className="text-white hover:text-green-400 font-bold underline transition cursor-pointer ml-1"
            >
              {isSignUp ? 'Log in here' : 'Sign up for free'}
            </button>
          </p>
        </div>

        {/* Quick Demo Credentials */}
        <div className="mt-6 p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-green-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Demo Logins</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleDemoLogin('alex.music@spotify.com')}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg border border-neutral-700 transition cursor-pointer"
            >
              alex.music@spotify.com
            </button>
            <button
              onClick={() => handleDemoLogin('listener.2026@gmail.com')}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg border border-neutral-700 transition cursor-pointer"
            >
              listener.2026@gmail.com
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-xs text-neutral-500 font-medium z-10">
        Firebase Auth • Session Persistence Enabled • React Context API
      </footer>
    </div>
  );
};
