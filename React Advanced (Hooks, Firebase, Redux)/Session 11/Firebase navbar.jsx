import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

/* ============================================================
   MOCK of firebase/app + firebase/auth
   Same function signatures as the real SDK — swap for real
   imports and nothing else in this file changes.
   ============================================================ */
function initializeApp(config) {
  return { name: "[DEFAULT]", options: config };
}
const mockUserStore = new Map([
  // a pre-seeded account so you can log in immediately
  ["demo@app.com", { password: "demo1234", user: { uid: "uid_demo01", email: "demo@app.com", displayName: "Demo User" } }],
]);
let currentUser = null;
const listeners = new Set();
const notify = () => listeners.forEach((cb) => cb(currentUser));

function getAuth(app) { return { app }; }
function onAuthStateChanged(auth, cb) {
  listeners.add(cb);
  cb(currentUser);
  return () => listeners.delete(cb);
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

const app = initializeApp({ projectId: "demo-app" });
const auth = getAuth(app);

/* ============================================================
   AuthContext.js equivalent
   ============================================================ */
const AuthContext = createContext();

const AuthProvider = ({ children, onLog }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecked(true);
      onLog(user ? `onAuthStateChanged → ${user.displayName || user.email}` : "onAuthStateChanged → Guest");
    });
    return unsubscribe;
  }, [onLog]);

  const login = async (email, password) => {
    onLog(`signInWithEmailAndPassword("${email}", "••••••") called…`);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    onLog(`✅ Logged in as ${user.email}`);
  };

  const logout = async () => {
    onLog("signOut() called…");
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, authChecked, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

/* ============================================================
   Navbar.js — Guest / user email + Sign In / Log Out
   ============================================================ */
const Navbar = ({ page, onNavigate }) => {
  const { currentUser, logout } = useAuth();

  const linkStyle = (p) => ({
    cursor: "pointer",
    fontWeight: page === p ? 700 : 400,
    opacity: page === p ? 1 : 0.7,
  });

  return (
    <nav className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-3 text-white text-sm">
      <div className="flex gap-4">
        <span style={linkStyle("home")} onClick={() => onNavigate("home")}>MySpotify</span>
        <span style={linkStyle("profile")} onClick={() => onNavigate("profile")}>Profile</span>
        <span style={linkStyle("orders")} onClick={() => onNavigate("orders")}>My Orders</span>
      </div>
      <div className="flex items-center gap-3">
        {currentUser ? (
          <>
            <span>Welcome, {currentUser.displayName || currentUser.email}</span>
            <button onClick={logout} className="px-3 py-1 rounded-lg bg-white text-zinc-900 font-medium">
              Log Out
            </button>
          </>
        ) : (
          <>
            <span className="opacity-80">Welcome, Guest</span>
            <button onClick={() => onNavigate("login")} className="px-3 py-1 rounded-lg bg-emerald-500 text-white font-medium">
              Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

/* ============================================================
   ProtectedRoute equivalent — redirects to "login" page if
   there's no authenticated user, once the auth state is known
   ============================================================ */
const ProtectedPage = ({ children, onNavigate, onLog, label }) => {
  const { currentUser, authChecked } = useAuth();

  useEffect(() => {
    if (authChecked && !currentUser) {
      onLog(`🔒 ${label} is protected → no user → redirecting to /login`);
      onNavigate("login");
    }
  }, [authChecked, currentUser, onNavigate, onLog, label]);

  if (!authChecked) return <p className="text-sm text-zinc-400">Checking authentication…</p>;
  if (!currentUser) return null; // redirect effect above will fire

  return children;
};

/* ============================================================
   Pages
   ============================================================ */
const Home = () => (
  <div className="rounded-xl border border-zinc-200 bg-white p-5">
    <h2 className="text-lg font-semibold mb-1">Home</h2>
    <p className="text-sm text-zinc-500">Public page — visible to everyone, logged in or not.</p>
  </div>
);

const LoginPage = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("demo@app.com");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      onNavigate("home");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <h2 className="text-lg font-semibold mb-3">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button disabled={busy} className="w-full rounded-lg bg-emerald-600 text-white text-sm font-medium py-2 disabled:opacity-50">
          {busy ? "Signing in…" : "Sign In"}
        </button>
      </form>
      <p className="text-xs text-zinc-400 mt-3">Pre-seeded account: demo@app.com / demo1234</p>
    </div>
  );
};

const Profile = () => {
  const { currentUser } = useAuth();
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <h2 className="text-lg font-semibold mb-1">Profile</h2>
      <p className="text-sm text-zinc-600">Signed in as {currentUser.email}</p>
      <p className="text-xs text-zinc-400 font-mono mt-1">uid: {currentUser.uid}</p>
    </div>
  );
};

const MyOrders = () => (
  <div className="rounded-xl border border-zinc-200 bg-white p-5">
    <h2 className="text-lg font-semibold mb-1">My Orders</h2>
    <p className="text-sm text-zinc-500">Order #1024 — Delivered · Order #1031 — Preparing</p>
  </div>
);

const ConsolePanel = ({ log }) => (
  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">console output</p>
    <div className="font-mono text-xs text-emerald-400 space-y-1 max-h-40 overflow-y-auto">
      {log.length === 0 && <p className="text-zinc-600">// waiting for auth events…</p>}
      {log.map((line, i) => (
        <p key={i}><span className="text-zinc-600">{`>`}</span> {line}</p>
      ))}
    </div>
  </div>
);

/* ============================================================
   App.js — wires navbar, pages, and the "router"
   ============================================================ */
function AppShell() {
  const [page, setPage] = useState("home");
  const [log, setLog] = useState([]);
  const addLog = useCallback((line) => setLog((prev) => [...prev.slice(-30), line]), []);

  return (
    <AuthProvider onLog={addLog}>
      <div className="space-y-4">
        <Navbar page={page} onNavigate={setPage} />

        {page === "home" && <Home />}
        {page === "login" && <LoginPage onNavigate={setPage} />}
        {page === "profile" && (
          <ProtectedPage onNavigate={setPage} onLog={addLog} label="/profile">
            <Profile />
          </ProtectedPage>
        )}
        {page === "orders" && (
          <ProtectedPage onNavigate={setPage} onLog={addLog} label="/myorders">
            <MyOrders />
          </ProtectedPage>
        )}

        <ConsolePanel log={log} />
      </div>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-md mx-auto space-y-3">
        <p className="text-sm text-zinc-500">
          Try clicking "Profile" or "My Orders" while logged out — you'll be redirected to Sign In.
        </p>
        <AppShell />
      </div>
    </div>
  );
}