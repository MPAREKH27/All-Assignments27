import { useState, useEffect } from "react";

// Task 4: BEFORE refactor — data was fetched on button click
// AFTER refactor — data is fetched automatically with useEffect on mount.
// Constraint: Only the fetch logic is moved; UI and styling remain unchanged.

const DataFetcher = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // starts loading on mount
  const [error, setError] = useState(null);

  // ✅ REFACTORED: fetch logic moved from button-click handler to useEffect
  // Previously this code was inside: const handleFetch = () => { ... }
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
      .then((response) => {
        if (!response.ok) throw new Error("Fetch failed");
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Fetches automatically when component mounts — no button needed

  // ---- UI below is UNCHANGED from original ----
  return (
    <section className="card">
      <div className="card-header">
        <span className="badge badge-blue">🔄 Task 4</span>
        <h2>Data Fetcher — Refactored</h2>
        <p className="subtitle">
          Fetch logic moved from <code>onClick</code> → <code>useEffect</code>.
          Data loads automatically on mount. UI &amp; styling unchanged.
        </p>
      </div>

      {/* Refactor diff notice */}
      <div className="refactor-diff">
        <div className="diff-before">
          <span className="diff-label removed">❌ Before (button click)</span>
          <pre>{`const handleFetch = () => {
  fetch("/posts").then(...)`}</pre>
        </div>
        <div className="diff-arrow">→</div>
        <div className="diff-after">
          <span className="diff-label added">✅ After (useEffect)</span>
          <pre>{`useEffect(() => {
  fetch("/posts").then(...)
}, []);`}</pre>
        </div>
      </div>

      {/* Data display — unchanged UI */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <span>Auto-fetching data on mount...</span>
        </div>
      )}
      {error && <div className="error-state">❌ {error}</div>}
      {!loading && !error && (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <span className="post-id">#{post.id}</span>
              <p className="post-title">
                {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="console-hint">
        <span>🚫</span>
        <span>No button needed — data fetches automatically on mount!</span>
      </div>
    </section>
  );
};

export default DataFetcher;
