import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

/* ============================================================
   MOCK Firebase SDK
   ------------------------------------------------------------
   Same function names/shapes as the real `firebase/app` and
   `firebase/auth` packages, so swapping this out for:

     import { initializeApp } from "firebase/app";
     import { getAuth, createUserWithEmailAndPassword, ... } from "firebase/auth";

   requires no changes to the rest of this file — only this
   mock block goes away.
   ============================================================ */

const firebaseConfig = {
  apiKey: "DEMO_API_KEY",
  authDomain: "zomato-clone.firebaseapp.com",
  projectId: "zomato-clone",
  storageBucket: "zomato-clone.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456",
};

function initializeApp(config) {
  return { name: "[DEFAULT]", automaticDataCollectionEnabled: false, options: config };
}

// In-memory "database" of registered users, keyed by email
const mockUserStore = new Map();
let currentUser = null;
const authStateListeners = new Set();

function notifyAuthState() {
  authStateListeners.forEach((cb) => cb(currentUser));
}

function getAuth(app) {
  return { app, get currentUser() { return currentUser; } };
}

function onAuthStateChanged(auth, callback) {
  authStateListeners.add(callback);
  callback(currentUser); // fire immediately with current state, like the real SDK
  return () => authStateListeners.delete(callback); // unsubscribe fn
}

function createUserWithEmailAndPassword(auth, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockUserStore.has(email)) {
        reject({ code: "auth/email-already-in-use", message: "Email already in use." });
        return;
      }
      const user = { uid: "uid_" + Math.random().toString(36).slice(2, 10), email };
      mockUserStore.set(email, { password, user });
      currentUser = user;
      notifyAuthState();
      resolve({ user });
    }, 400);
  });
}

function signInWithEmailAndPassword(auth, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const record = mockUserStore.get(email);
      if (!record || record.password !== password) {
        reject({ code: "auth/invalid-credential", message: "Wrong email or password." });
        return;
      }
      currentUser = record.user;
      notifyAuthState();
      resolve({ user: record.user });
    }, 400);
  });
}

function signOut(auth) {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null;
      notifyAuthState();
      resolve();
    }, 200);
  });
}

/* ============================================================
   firebase.js equivalent — initialize once, export instances
   ============================================================ */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ============================================================
   AuthContext — wraps onAuthStateChanged so any component
   can read the current user
   ============================================================ */
const AuthContext = createContext();

const AuthProvider = ({ children, onLog }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
      onLog(u ? `onAuthStateChanged → signed in as ${u.email} (uid: ${u.uid})` : "onAuthStateChanged → signed out");
    });
    return unsubscribe;
  }, [onLog]);

  const signUp = useCallback(
    async (email, password) => {
      onLog(`createUserWithEmailAndPassword("${email}", "••••••") called…`);
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        onLog(`✅ Account created for ${user.email}`);
      } catch (err) {
        onLog(`❌ ${err.code}: ${err.message}`);
        throw err;
      }
    },
    [onLog]
  );

  const logIn = useCallback(
    async (email, password) => {
      onLog(`signInWithEmailAndPassword("${email}", "••••••") called…`);
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        onLog(`✅ Logged in as ${user.email}`);
      } catch (err) {
        onLog(`❌ ${err.code}: ${err.message}`);
        throw err;
      }
    },
    [onLog]
  );

  const logOut = useCallback(async () => {
    onLog("signOut() called…");
    await signOut(auth);
  }, [onLog]);

  return (
    <AuthContext.Provider value={{ user, ready, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

/* ============================================================
   UI
   ============================================================ */
const AuthForm = () => {
  const { signUp, logIn } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") await signUp(email, password);
      else await logIn(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("login")}
          className={`text-sm px-3 py-1.5 rounded-full font-medium border ${
            mode === "login" ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-600 border-zinc-200"
          }`}
        >
          Log in
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`text-sm px-3 py-1.5 rounded-full font-medium border ${
            mode === "signup" ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-600 border-zinc-200"
          }`}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          minLength={4}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-emerald-600 text-white text-sm font-medium py-2 disabled:opacity-50"
        >
          {busy ? "Working…" : mode === "signup" ? "Create account" : "Log in"}
        </button>
      </form>
      <p className="text-xs text-zinc-400 mt-3">
        Try creating an account, then log out and log back in with the same credentials — or try a wrong password.
      </p>
    </div>
  );
};

const UserPanel = () => {
  const { user, logOut } = useAuth();
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Signed in</p>
      <h2 className="text-lg font-semibold mb-1">{user.email}</h2>
      <p className="text-xs text-zinc-400 font-mono mb-4">uid: {user.uid}</p>
      <button onClick={logOut} className="text-sm px-3 py-1.5 rounded-lg bg-zinc-900 text-white font-medium">
        Log out
      </button>
    </div>
  );
};

const ConfigPanel = () => (
  <details className="rounded-xl border border-zinc-200 bg-white p-5">
    <summary className="text-sm font-medium cursor-pointer">firebaseConfig (from process.env)</summary>
    <pre className="text-xs mt-3 bg-zinc-50 rounded-lg p-3 overflow-x-auto text-zinc-600">
{JSON.stringify(firebaseConfig, null, 2)}
    </pre>
  </details>
);

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
  const addLog = useCallback((line) => {
    setLog((prev) => [...prev.slice(-30), line]);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 mb-1">Firebase Auth (mocked)</h1>
          <p className="text-sm text-zinc-500">
            Same SDK function calls as real Firebase Auth, run against an in-memory store.
          </p>
        </div>

        <AuthProvider onLog={addLog}>
          <Body />
        </AuthProvider>

        <ConfigPanel />
        <ConsolePanel log={log} />
      </div>
    </div>
  );
}

function Body() {
  const { user, ready } = useAuth();
  if (!ready) return null;
  return user ? <UserPanel /> : <AuthForm />;
}