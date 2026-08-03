import React, { useState, useEffect } from "react";

// Custom Hook
function useTrendingMovies(apiKey) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [apiKey]);

  return { loading, error, movies };
}

// Component using the hook
function MoviesList({ apiKey }) {
  const { loading, error, movies } = useTrendingMovies(apiKey);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Trending Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;
