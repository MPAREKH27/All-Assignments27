import { useState, useEffect } from "react";

// Task 2: useEffect to fetch data from API on mount and display first post title
const IPLScoreFetcher = () => {
  const [headline, setHeadline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) throw new Error("Network error");
        return response.json();
      })
      .then((data) => {
        setHeadline(data[0].title); // Title of the first post
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Runs only on component mount

  return (
    <section className="card">
      <div className="card-header">
        <span className="badge badge-orange">🏏 Task 2</span>
        <h2>IPL Score Fetcher</h2>
        <p className="subtitle">
          Fetches posts from{" "}
          <code>jsonplaceholder.typicode.com/posts</code> on mount
        </p>
      </div>

      <div className="match-box">
        <div className="match-label">📡 Live Match Headline</div>
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <span>Fetching live data...</span>
          </div>
        )}
        {error && <div className="error-state">❌ Error: {error}</div>}
        {headline && (
          <div className="headline-display">
            <p className="headline-text">
              {headline.charAt(0).toUpperCase() + headline.slice(1)}
            </p>
          </div>
        )}
      </div>

      <div className="console-hint">
        <span>📦</span>
        <code>data[0].title</code>
        <span>→ first post title as match headline</span>
      </div>
    </section>
  );
};

export default IPLScoreFetcher;
