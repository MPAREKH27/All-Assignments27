import React, { createContext, useReducer, useContext, useMemo, useCallback, useState } from "react";

/* ============================================================
   1. ThemeContext — useReducer toggling light/dark
   ============================================================ */
const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
};

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, { theme: "light" });
  return (
    <ThemeContext.Provider value={{ theme: state.theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
const useTheme = () => useContext(ThemeContext);

const ThemeDemo = () => {
  const { theme, dispatch } = useTheme();
  const dark = theme === "dark";
  return (
    <div
      className={`rounded-xl border transition-colors duration-300 ${
        dark ? "bg-zinc-900 border-zinc-700 text-zinc-100" : "bg-white border-zinc-200 text-zinc-900"
      }`}
    >
      <header className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-60">Header</p>
          <h2 className="text-lg font-semibold">Current theme: {theme}</h2>
        </div>
        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            dark ? "bg-zinc-100 text-zinc-900" : "bg-zinc-900 text-white"
          }`}
        >
          Toggle
        </button>
      </header>
      <div className="px-5 pb-5 text-sm opacity-70">
        useReducer holds a single <code>theme</code> field; dispatching{" "}
        <code>TOGGLE_THEME</code> flips it and every consumer re-renders.
      </div>
    </div>
  );
};

/* ============================================================
   2. Zomato-style favorites — nested UserContext + FavoritesContext
   ============================================================ */
const UserContext = createContext();
const userReducer = (state) => state; // static demo user, no actions needed
const UserProvider = ({ children }) => {
  const [state] = useReducer(userReducer, { user: { id: "u1", name: "Aarav" } });
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
const useUser = () => useContext(UserContext);

const FavoritesContext = createContext();
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.includes(action.payload)) return state;
      return { favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return { favorites: state.favorites.filter((id) => id !== action.payload) };
    case "CLEAR_FAVORITES":
      return { favorites: [] };
    default:
      return state;
  }
};
const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] });
  return (
    <FavoritesContext.Provider value={{ favorites: state.favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
const useFavorites = () => useContext(FavoritesContext);

const restaurants = [
  { id: "r1", name: "Spice Villa" },
  { id: "r2", name: "Curry House" },
  { id: "r3", name: "Tandoori Nights" },
];

const FavoritesDemo = () => {
  const { user } = useUser();
  const { favorites, dispatch } = useFavorites();

  const toggleFavorite = (id) => {
    dispatch({ type: favorites.includes(id) ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: id });
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Welcome</p>
      <h2 className="text-lg font-semibold mb-4">{user.name}</h2>
      <div className="space-y-2">
        {restaurants.map((r) => {
          const active = favorites.includes(r.id);
          return (
            <div
              key={r.id}
              className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2"
            >
              <span className="text-sm font-medium text-zinc-800">{r.name}</span>
              <button
                onClick={() => toggleFavorite(r.id)}
                className={`text-sm px-3 py-1 rounded-md font-medium ${
                  active ? "bg-amber-100 text-amber-700" : "bg-zinc-900 text-white"
                }`}
              >
                {active ? "★ Favorited" : "☆ Add"}
              </button>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-zinc-500 mt-4">
        Favorite IDs: {favorites.length ? favorites.join(", ") : "none yet"}
      </p>
    </div>
  );
};

/* ============================================================
   3. Spotify-style Playlist — memoized context value
   ============================================================ */
const PlayerContext = createContext();
const playerReducer = (state, action) => {
  switch (action.type) {
    case "PLAY_TRACK":
      return { ...state, currentTrack: action.payload, isPlaying: true };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    default:
      return state;
  }
};
const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, {
    currentTrack: null,
    isPlaying: false,
    volume: 50,
  });

  const playTrack = useCallback((track) => dispatch({ type: "PLAY_TRACK", payload: track }), []);
  const setVolume = useCallback((v) => dispatch({ type: "SET_VOLUME", payload: v }), []);

  // Memoized so Playlist doesn't get a new context value when only volume changes
  const value = useMemo(
    () => ({ currentTrack: state.currentTrack, volume: state.volume, playTrack, setVolume }),
    [state.currentTrack, state.volume, playTrack, setVolume]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
const usePlayer = () => useContext(PlayerContext);

const tracks = [
  { id: "t1", title: "Midnight Drive" },
  { id: "t2", title: "Golden Hour" },
  { id: "t3", title: "Static Bloom" },
];

let playlistRenderCount = 0;
const Playlist = React.memo(() => {
  const { currentTrack, playTrack } = usePlayer();
  playlistRenderCount += 1;
  return (
    <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4">
      <p className="text-xs font-medium text-zinc-500 mb-2">
        Playlist render count: <span className="font-mono text-zinc-800">{playlistRenderCount}</span>
      </p>
      <ul className="space-y-1">
        {tracks.map((t) => (
          <li key={t.id} className="flex items-center justify-between text-sm">
            <span className={currentTrack?.id === t.id ? "font-semibold text-emerald-600" : "text-zinc-700"}>
              {t.title}
            </span>
            <button onClick={() => playTrack(t)} className="text-xs px-2 py-1 rounded bg-zinc-900 text-white">
              Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

const VolumeSlider = () => {
  const { volume, setVolume } = usePlayer();
  return (
    <div className="mt-4">
      <label className="text-xs text-zinc-500">Volume: {volume} (unrelated state — moving this should NOT bump the Playlist render count)</label>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

const PlayerDemo = () => (
  <div className="rounded-xl border border-zinc-200 bg-white p-5">
    <p className="text-xs uppercase tracking-widest opacity-60 mb-3">Now Playing</p>
    <Playlist />
    <VolumeSlider />
  </div>
);

/* ============================================================
   4. AuthContext — login/logout + update display name
   ============================================================ */
const AuthContext = createContext();
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, user: null };
    case "UPDATE_DISPLAY_NAME":
      return { ...state, user: state.user ? { ...state.user, displayName: action.payload } : state.user };
    default:
      return state;
  }
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false, user: null });
  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);

const AuthDemo = () => {
  const { user, isLoggedIn, dispatch } = useAuth();
  const [newName, setNewName] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-sm text-zinc-600 mb-3">Not logged in.</p>
        <button
          onClick={() => dispatch({ type: "LOGIN", payload: { id: "u1", displayName: "traveler_23" } })}
          className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-sm font-medium"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Profile</p>
      <h2 className="text-lg font-semibold mb-4">@{user.displayName}</h2>
      <div className="flex gap-2 mb-3">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New display name"
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm"
        />
        <button
          onClick={() => {
            if (!newName.trim()) return;
            dispatch({ type: "UPDATE_DISPLAY_NAME", payload: newName.trim() });
            setNewName("");
          }}
          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-medium"
        >
          Update
        </button>
      </div>
      <button onClick={() => dispatch({ type: "LOGOUT" })} className="text-sm text-zinc-500 underline">
        Log out
      </button>
    </div>
  );
};

/* ============================================================
   5. CartContext — add / remove / clear cart
   ============================================================ */
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const value = useMemo(
    () => ({ items: state.items, totalPrice, totalItems, dispatch }),
    [state.items, totalPrice, totalItems]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
const useCart = () => useContext(CartContext);

const products = [
  { id: "p1", name: "Wireless Mouse", price: 799 },
  { id: "p2", name: "Mechanical Keyboard", price: 2499 },
];

const CartDemo = () => {
  const { items, totalItems, totalPrice, dispatch } = useCart();
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Shop</p>
      <div className="space-y-2 mb-4">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between text-sm">
            <span>{p.name} — ₹{p.price}</span>
            <button
              onClick={() => dispatch({ type: "ADD_ITEM", payload: { ...p, quantity: 1 } })}
              className="text-xs px-2 py-1 rounded bg-zinc-900 text-white"
            >
              Add
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Cart ({totalItems})</p>
      {items.length === 0 && <p className="text-sm text-zinc-400 mb-3">Empty</p>}
      <div className="space-y-2 mb-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm bg-zinc-50 rounded-lg px-3 py-2">
            <span>{item.name} × {item.quantity}</span>
            <button
              onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })}
              className="text-xs text-red-600 font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
        <span className="text-sm font-semibold">Total: ₹{totalPrice}</span>
        <button onClick={() => dispatch({ type: "CLEAR_CART" })} className="text-xs text-zinc-500 underline">
          Clear cart
        </button>
      </div>
    </div>
  );
};

/* ============================================================
   App shell — tabbed navigation across the five demos
   ============================================================ */
const demos = [
  { key: "theme", label: "1 · Theme", node: <ThemeProvider><ThemeDemo /></ThemeProvider> },
  {
    key: "favorites",
    label: "2 · Favorites",
    node: (
      <UserProvider>
        <FavoritesProvider>
          <FavoritesDemo />
        </FavoritesProvider>
      </UserProvider>
    ),
  },
  { key: "player", label: "3 · Memoized Context", node: <PlayerProvider><PlayerDemo /></PlayerProvider> },
  { key: "auth", label: "4 · Auth", node: <AuthProvider><AuthDemo /></AuthProvider> },
  { key: "cart", label: "5 · Cart", node: <CartProvider><CartDemo /></CartProvider> },
];

export default function App() {
  const [active, setActive] = useState("theme");
  const activeDemo = demos.find((d) => d.key === active);

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-xl font-bold text-zinc-900 mb-1">Context + useReducer patterns</h1>
        <p className="text-sm text-zinc-500 mb-5">Five isolated, runnable examples — switch tabs to try each.</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {demos.map((d) => (
            <button
              key={d.key}
              onClick={() => setActive(d.key)}
              className={`text-sm px-3 py-1.5 rounded-full font-medium border ${
                active === d.key
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-600 border-zinc-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div key={active}>{activeDemo.node}</div>
      </div>
    </div>
  );
}