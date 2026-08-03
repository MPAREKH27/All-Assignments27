import React, { useState, useEffect, createContext, useContext } from "react";
import "./App.css";

// ══════════════════════════════════════════════════════════════
// Q1 — PlaylistCard Component (Props Practice)
// ══════════════════════════════════════════════════════════════
function PlaylistCard({ songName, artist, coverEmoji, accentColor }) {
  return (
    <div className="playlist-card" style={{ "--card-accent": accentColor }}>
      <div className="playlist-cover-art" style={{ background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`, borderColor: `${accentColor}44` }}>
        <span className="cover-emoji">{coverEmoji}</span>
        <div className="vinyl-ring" />
      </div>
      <div className="playlist-info">
        <p className="song-name">{songName}</p>
        <p className="artist-name">{artist}</p>
      </div>
      <button className="play-btn" style={{ background: accentColor }} aria-label={`Play ${songName}`}>
        ▶
      </button>
    </div>
  );
}

function Q1PlaylistCards() {
  const songs = [
    { id: 1, songName: "Blinding Lights",       artist: "The Weeknd",   coverEmoji: "🌃", accentColor: "#e0115f" },
    { id: 2, songName: "Shape of You",           artist: "Ed Sheeran",   coverEmoji: "🎸", accentColor: "#f59e0b" },
    { id: 3, songName: "Levitating",             artist: "Dua Lipa",     coverEmoji: "🚀", accentColor: "#8b5cf6" },
  ];

  return (
    <div className="cards-column">
      {songs.map((s) => (
        <PlaylistCard key={s.id} {...s} />
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// Q2 — LikeCounter Component (useState)
// ══════════════════════════════════════════════════════════════
function LikeCounter() {
  const [likes, setLikes] = useState(0);
  const [burst, setBurst] = useState(false);
  const [floats, setFloats] = useState([]);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    setBurst(true);
    const id = Date.now();
    setFloats((prev) => [...prev, id]);
    setTimeout(() => setBurst(false), 500);
    setTimeout(() => setFloats((prev) => prev.filter((f) => f !== id)), 1200);
  };

  return (
    <div className="like-counter-wrapper">
      <div className="ig-post-card">
        {/* Post image placeholder */}
        <div className="ig-post-image">
          <span className="ig-post-img-emoji">🏖️</span>
          <p className="ig-post-caption-overlay">Perfect day! ☀️</p>
        </div>
        <div className="ig-post-footer">
          <div className="ig-like-row">
            <div className="like-btn-wrap">
              <button
                id="like-button"
                className={`ig-like-btn ${burst ? "burst" : ""}`}
                onClick={handleLike}
                aria-label="Like this post"
              >
                ❤️
              </button>
              {floats.map((id) => (
                <span key={id} className="float-heart">❤️</span>
              ))}
            </div>
            <span className="ig-like-count">
              {likes.toLocaleString()} {likes === 1 ? "like" : "likes"}
            </span>
          </div>
          <p className="ig-username">
            <strong>jane.doe</strong> Beautiful golden hour! 🌅 #beach #summer
          </p>
          <p className="ig-hook-note">
            Hook: <code>const [likes, setLikes] = useState(0)</code>
          </p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// Q3 — React Context API (avoid prop drilling)
// Tree: App > Feed > Post > LikeButton
// ══════════════════════════════════════════════════════════════
const UserContext = createContext(null);

// LikeButton — deepest child, consumes context directly
function LikeButtonCtx() {
  const user = useContext(UserContext);
  const [liked, setLiked] = useState(false);

  return (
    <div className="ctx-likebtn-wrap">
      <button
        id="context-like-button"
        className={`ctx-like-btn ${liked ? "ctx-liked" : ""}`}
        onClick={() => setLiked((p) => !p)}
      >
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>
      <p className="ctx-user-note">
        Logged in as <strong>{user.name}</strong> · Role: <em>{user.role}</em>
      </p>
    </div>
  );
}

// Post — uses context for username, renders LikeButton
function PostCtx({ title, body }) {
  const user = useContext(UserContext);
  return (
    <div className="ctx-post-card">
      <div className="ctx-post-header">
        <div className="ctx-avatar">{user.avatar}</div>
        <div>
          <p className="ctx-post-author">{user.name}</p>
          <p className="ctx-post-role">{user.role}</p>
        </div>
      </div>
      <h4 className="ctx-post-title">{title}</h4>
      <p className="ctx-post-body">{body}</p>
      <LikeButtonCtx />
    </div>
  );
}

// Feed — renders posts (NO user prop needed!)
function FeedCtx() {
  const posts = [
    { id: 1, title: "React Context is 🔥",    body: "No more prop drilling! useContext makes sharing state elegant and clean." },
    { id: 2, title: "Custom Hooks FTW",        body: "Extract logic, reuse anywhere. Custom hooks are one of React's best features." },
  ];
  return (
    <div className="ctx-feed">
      {posts.map((p) => <PostCtx key={p.id} {...p} />)}
    </div>
  );
}

// AppCtx — provides the user object to the whole tree
function Q3ContextDemo() {
  const user = { name: "Mohit Parekh", role: "React Developer", avatar: "🧑‍💻" };
  return (
    <UserContext.Provider value={user}>
      <div className="ctx-demo-wrap">
        <div className="ctx-tree-diagram">
          <div className="ctx-tree-node provider">
            <span className="tree-icon">⚛️</span>
            <div>
              <p className="tree-label">App (Provider)</p>
              <p className="tree-desc">Wraps tree with <code>UserContext.Provider value={"{user}"}</code></p>
            </div>
          </div>
          <div className="ctx-tree-line" />
          <div className="ctx-tree-node">
            <span className="tree-icon">📰</span>
            <div>
              <p className="tree-label">Feed</p>
              <p className="tree-desc">No user prop — doesn't need it!</p>
            </div>
          </div>
          <div className="ctx-tree-line" />
          <div className="ctx-tree-node">
            <span className="tree-icon">📝</span>
            <div>
              <p className="tree-label">Post</p>
              <p className="tree-desc"><code>useContext(UserContext)</code> → gets user</p>
            </div>
          </div>
          <div className="ctx-tree-line" />
          <div className="ctx-tree-node consumer">
            <span className="tree-icon">❤️</span>
            <div>
              <p className="tree-label">LikeButton</p>
              <p className="tree-desc"><code>useContext(UserContext)</code> → gets user</p>
            </div>
          </div>
        </div>
        <FeedCtx />
      </div>
    </UserContext.Provider>
  );
}

// ══════════════════════════════════════════════════════════════
// Q4 — useFetchData Hook + FlipkartProductList
// ══════════════════════════════════════════════════════════════
function useFetchData(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) { setData(json); setLoading(false); }
      })
      .catch((err) => {
        if (!cancelled) { setError(err); setLoading(false); }
      });
    return () => { cancelled = true; };
  }, [url]);

  return { loading, data, error };
}

const CATEGORY_COLORS = {
  "electronics":        "#3b82f6",
  "jewelery":           "#ec4899",
  "men's clothing":     "#10b981",
  "women's clothing":   "#f59e0b",
};

function FlipkartProductList() {
  const { loading, data, error } = useFetchData("https://fakestoreapi.com/products");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  if (loading) {
    return (
      <div className="fk-state-box">
        <div className="fk-spinner" />
        <p>Fetching products from Flipkart…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fk-state-box fk-error">
        <span className="fk-state-icon">⚠️</span>
        <p>Failed to load: <code>{error.message}</code></p>
      </div>
    );
  }

  const categories = ["all", ...new Set(data.map((p) => p.category))];
  const filtered = data
    .filter((p) => filter === "all" || p.category === filter)
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fk-wrapper">
      {/* Header bar */}
      <div className="fk-header-bar">
        <div className="fk-logo">
          <span className="fk-logo-f">F</span>lipkart
          <span className="fk-logo-star">★</span>
        </div>
        <input
          id="product-search"
          className="fk-search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="fk-product-count">{filtered.length} products</span>
      </div>

      {/* Category filters */}
      <div className="fk-filter-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`fk-filter-btn ${filter === cat ? "fk-filter-active" : ""}`}
            onClick={() => setFilter(cat)}
            style={filter === cat ? { "--fk-active-color": CATEGORY_COLORS[cat] || "#7c3aed" } : {}}
          >
            {cat === "all" ? "🛍️ All" : cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="fk-product-grid">
        {filtered.map((product) => (
          <div key={product.id} className="fk-product-card">
            <div className="fk-product-img-wrap">
              <img src={product.image} alt={product.title} className="fk-product-img" loading="lazy" />
              <span className="fk-category-chip" style={{ background: `${CATEGORY_COLORS[product.category] || "#7c3aed"}22`, color: CATEGORY_COLORS[product.category] || "#a855f7" }}>
                {product.category}
              </span>
            </div>
            <div className="fk-product-body">
              <p className="fk-product-title">{product.title}</p>
              <div className="fk-product-meta">
                <span className="fk-rating">⭐ {product.rating.rate} <span className="fk-rating-count">({product.rating.count})</span></span>
                <span className="fk-price">₹{(product.price * 83).toFixed(0)}</span>
              </div>
              <button className="fk-add-btn" id={`add-to-cart-${product.id}`}>+ Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="fk-empty">
          <span>🔍</span>
          <p>No products found for "<strong>{search}</strong>"</p>
        </div>
      )}

      <p className="fk-hook-note">
        Hook: <code>useFetchData("https://fakestoreapi.com/products")</code> → returns <code>{"{ loading, data, error }"}</code>
      </p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// Main App — Tab Navigation
// ══════════════════════════════════════════════════════════════
const SECTIONS = [
  { id: "q1", label: "Q1 · PlaylistCard",   emoji: "🎵" },
  { id: "q2", label: "Q2 · LikeCounter",    emoji: "❤️" },
  { id: "q3", label: "Q3 · Context API",    emoji: "⚛️" },
  { id: "q4", label: "Q4 · useFetchData",   emoji: "🛒" },
];

export default function App() {
  const [active, setActive] = useState("q1");

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="header-logo">⚛️</div>
        <div className="header-text">
          <h1 className="header-title">React Advanced — Session 2</h1>
          <p className="header-sub">Props · useState · Context API · Custom Hooks</p>
        </div>
      </header>

      {/* Tab Nav */}
      <nav className="tab-nav">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`tab-btn ${active === s.id ? "tab-active" : ""}`}
            onClick={() => setActive(s.id)}
            id={`tab-${s.id}`}
          >
            <span className="tab-emoji">{s.emoji}</span>
            <span className="tab-label">{s.label}</span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="main-content">
        {/* ── Q1 ── */}
        {active === "q1" && (
          <section className="section" key="q1">
            <div className="section-header">
              <span className="q-badge">Q1</span>
              <div>
                <h2 className="section-title">PlaylistCard — Passing Props</h2>
                <p className="section-sub">
                  <code>PlaylistCard</code> accepts <code>songName</code> and <code>artist</code> as props and renders them.
                  Three instances are rendered with different data below.
                </p>
              </div>
            </div>
            <div className="code-pill">
              <code>{"<PlaylistCard songName=\"Blinding Lights\" artist=\"The Weeknd\" />"}</code>
            </div>
            <Q1PlaylistCards />
          </section>
        )}

        {/* ── Q2 ── */}
        {active === "q2" && (
          <section className="section" key="q2">
            <div className="section-header">
              <span className="q-badge">Q2</span>
              <div>
                <h2 className="section-title">LikeCounter — useState Hook</h2>
                <p className="section-sub">
                  <code>LikeCounter</code> uses <code>useState</code> to track likes. Each click increments the count with a heart-burst animation — just like Instagram.
                </p>
              </div>
            </div>
            <div className="code-pill">
              <code>const [likes, setLikes] = useState(0)</code>
            </div>
            <LikeCounter />
          </section>
        )}

        {/* ── Q3 ── */}
        {active === "q3" && (
          <section className="section" key="q3">
            <div className="section-header">
              <span className="q-badge">Q3</span>
              <div>
                <h2 className="section-title">Context API — Avoid Prop Drilling</h2>
                <p className="section-sub">
                  The <code>user</code> object is provided once at the top via <code>createContext</code> + <code>UserContext.Provider</code>.
                  Deep children consume it with <code>useContext(UserContext)</code> — no prop drilling across 4 levels.
                </p>
              </div>
            </div>
            <div className="code-pill">
              App (<em>Provider</em>) → Feed → Post → LikeButton (<em>Consumer</em>)
            </div>
            <Q3ContextDemo />
          </section>
        )}

        {/* ── Q4 ── */}
        {active === "q4" && (
          <section className="section" key="q4">
            <div className="section-header">
              <span className="q-badge">Q4</span>
              <div>
                <h2 className="section-title">useFetchData — FlipkartProductList</h2>
                <p className="section-sub">
                  Custom hook <code>useFetchData(url)</code> encapsulates fetch logic and returns <code>loading</code>, <code>data</code>, <code>error</code>.
                  Used in <code>FlipkartProductList</code> to fetch real products from <code>fakestoreapi.com</code>.
                </p>
              </div>
            </div>
            <FlipkartProductList />
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>React Advanced · Session 2 · Assignment — Mohit Parekh</p>
      </footer>
    </div>
  );
}
