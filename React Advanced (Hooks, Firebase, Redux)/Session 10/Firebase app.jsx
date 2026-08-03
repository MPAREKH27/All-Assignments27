import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

/* ============================================================
   MOCK of firebase/app + firebase/auth
   ------------------------------------------------------------
   Function names/signatures match the real SDK exactly.
   Swap this block for real imports and nothing else changes:

     import { initializeApp } from "firebase/app";
     import { getAuth, createUserWithEmailAndPassword,
              signInWithEmailAndPassword, signOut,
              onAuthStateChanged } from "firebase/auth";
   ============================================================ */

const firebaseConfig = {
  apiKey: "DEMO_API_KEY",
  authDomain: "my-app.firebaseapp.com",
  projectId: "my-app",
  storageBucket: "my-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456",
};

function initializeApp(config) {
  return { name: "[DEFAULT]", options: config };
}

const mockUserStore = new Map();
let currentUser = null;
const listeners = new Set();
const notify = () => listeners.forEach((cb) => cb(currentUser));

function getAuth(app) {
  return { app };
}
function onAuthStateChanged(auth, cb) {
  listeners.add(cb);
  cb(currentUser);
  return () => listeners.delete(cb);
}
function createUserWithEmailAndPassword(auth, email, password) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (mockUserStore.has(email)) {
        reject({ code: "auth/email-already-in-use", message: "Email already in use." });
        return;
      }
      const user = { uid: "uid_" + Math.random().toString(36).slice(2, 10), email };
      mockUserStore.set(email, { password, user });
      currentUser = user;
      notify();
      resolve({ user });
    }, 350)
  );
}
function signInWithEmailAndPassword(auth, email, password) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const record = mockUserStore.get(email);
      if (!record || record.password !== password) {
        reject({ code: "auth/invalid-credential", message: "Wrong email or password." });
        return;
      }
      currentUser = record.user;
      notify();
      resolve({ user: record.user });
    }, 350)
  );
}
function signOut() {
  return new Promise((resolve) =>
    setTimeout(() => {
      currentUser = null;
      notify();
      resolve();
    }, 200)
  );
}

/* ============================================================
   firebase.js equivalent
   ============================================================ */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ============================================================
   logout.js equivalent — the "ChatGPT-generated" function
   ============================================================ */
const logOutUser = async (onLog) => {
  try {
    await signOut(auth);
    onLog("User logged out successfully");
  } catch (error) {
    onLog("Error logging out: " + error.message);
  }
};

/* ============================================================
   Shared console + config display (not part of the "real" app,
   just here so you can see what's happening under the hood)
   ============================================================ */
const LogContext = createContext();
const useLog = () => useContext(LogContext);

/* ============================================================
   SignUp.js
   ============================================================ */
const SignUp = () => {
  const log = useLog();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    log(`createUserWithEmailAndPassword("${email}", "••••••") called…`);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      log(`✅ Account created for ${email}`);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
      log(`❌ ${err.code}: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-3">
      <h2 className="text-lg font-semibold">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={4}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
      />
      <button type="submit" className="w-full rounded-lg bg-emerald-600 text-white text-sm font-medium py-2">
        Create Account
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {success && <p className="text-xs text-emerald-600">Account created! You're now logged in.</p>}
    </form>
  );
};

/* ============================================================
   Login.js
   ============================================================ */
const Login = () => {
  const log = useLog();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    log(`signInWithEmailAndPassword("${email}", "••••••") called…`);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      log(`✅ Logged in as ${email}`);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Login failed: " + err.message);
      log(`❌ ${err.code}: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <h2 className="text-lg font-semibold">Log In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
      />
      <button type="submit" className="w-full rounded-lg bg-zinc-900 text-white text-sm font-medium py-2">
        Log In
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </form>
  );
};

/* ============================================================
   App.js — onAuthStateChanged + header email + logout wiring
   ============================================================ */
function AppBody() {
  const log = useLog();
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setCheckingAuth(false);
      log(user ? `onAuthStateChanged → ${user.email} (uid: ${user.uid})` : "onAuthStateChanged → signed out");
    });
    return unsubscribe;
  }, [log]);

  if (checkingAuth) return <p className="text-sm text-zinc-400">Loading…</p>;

  return (
    <div className="space-y-4">
      <header className="rounded-xl border border-zinc-200 bg-white px-5 py-4 flex items-center justify-between">
        <h1 className="font-bold text-zinc-900">My App</h1>
        {currentUser ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-600">Logged in as: {currentUser.email}</span>
            <button
              onClick={() => logOutUser(log)}
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 text-white font-medium"
            >
              Log Out
            </button>
          </div>
        ) : (
          <span className="text-sm text-zinc-400">Not logged in</span>
        )}
      </header>

      <main className="rounded-xl border border-zinc-200 bg-white p-5">
        {currentUser ? (
          <p className="text-sm text-zinc-700">Welcome back, {currentUser.email}!</p>
        ) : (
          <>
            {showSignUp ? <SignUp /> : <Login />}
            <button
              onClick={() => setShowSignUp(!showSignUp)}
              className="text-xs text-zinc-500 underline mt-3"
            >
              {showSignUp ? "Already have an account? Log in" : "Need an account? Sign up"}
            </button>
          </>
        )}
      </main>
    </div>
  );
}

const ConsolePanel = ({ log }) => (
  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">console output</p>
    <div className="font-mono text-xs text-emerald-400 space-y-1 max-h-48 overflow-y-auto">
      {log.length === 0 && <p className="text-zinc-600">// waiting for auth events…</p>}
      {log.map((line, i) => (
        <p key={i}>
          <span className="text-zinc-600">{`>`}</span> {line}
        </p>
      ))}
    </div>
  </div>
);

export default function App() {
  const [log, setLog] = useState([]);
  const addLog = useCallback((line) => setLog((prev) => [...prev.slice(-30), line]), []);

  return (
    <LogContext.Provider value={addLog}>
      <div className="min-h-screen bg-zinc-100 p-6">
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-sm text-zinc-500">
            Full flow: firebase.js → SignUp/Login → onAuthStateChanged header → logOutUser()
          </p>
          <AppBody />
          <ConsolePanel log={log} />
        </div>
      </div>
    </LogContext.Provider>
  );
}