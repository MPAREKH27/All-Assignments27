import { useState, useEffect } from "react";

// Task 3: Fetch list of users, display names, show loading state while fetching
const MovieSuggestions = () => {
  const [movies, setMovies] = useState([]);       // holds fetched data
  const [loading, setLoading] = useState(true);   // loading state — true initially
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from API (treated as "movie directors / suggestions")
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false); // Update loading to false once data is received
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty array → runs once on mount

  return (
    <section className="card">
      <div className="card-header">
        <span className="badge badge-green">🎬 Task 3</span>
        <h2>Movie Suggestions</h2>
        <p className="subtitle">
          Fetches{" "}
          <code>jsonplaceholder.typicode.com/users</code> — shows loading
          state until data arrives
        </p>
      </div>

      {/* Loading message shown while data is being fetched */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <span>🎥 Loading movie suggestions, please wait...</span>
        </div>
      )}

      {error && <div className="error-state">❌ Error: {error}</div>}

      {/* Display names in a list once loaded */}
      {!loading && !error && (
        <ul className="movie-list">
          {movies.map((movie, index) => (
            <li key={movie.id} className="movie-item">
              <span className="movie-number">{index + 1}</span>
              <div className="movie-details">
                <strong className="movie-name">{movie.name}</strong>
                <span className="movie-genre">
                  {movie.email}
                </span>
              </div>
              <span className="movie-rating">⭐ {(Math.random() * 2 + 3).toFixed(1)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="console-hint">
        <span>⏳</span>
        <code>loading = true</code>
        <span>→ shows "Loading..." until data received</span>
      </div>
    </section>
  );
};

export default MovieSuggestions;
