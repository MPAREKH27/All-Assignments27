import { useState } from "react";
import useSearchMovies from "../../hooks/useSearchMovies";

function SearchMoviesList() {
  const [query, setQuery] = useState("");
  const [brokenImages, setBrokenImages] = useState({});
  const { movies, loading, error } = useSearchMovies(query);

  const handleImageError = (imdbID) => {
    setBrokenImages((prev) => ({ ...prev, [imdbID]: true }));
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        Search Movies (OMDb)
      </h2>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 mb-6"
      />

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-center py-4">Error: {error}</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={
                  brokenImages[movie.imdbID] || movie.Poster === "N/A"
                    ? "https://placehold.co/300x450/1f2937/a78bfa?text=No+Poster"
                    : movie.Poster
                }
                alt={movie.Title}
                className="w-full h-64 object-cover"
                onError={() => handleImageError(movie.imdbID)}
              />
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm truncate">
                  {movie.Title}
                </h3>
                <p className="text-gray-400 text-xs">
                  {movie.Year} &middot; {movie.Type}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && query && movies.length === 0 && (
        <p className="text-gray-400 text-center py-4">No movies found.</p>
      )}
    </div>
  );
}

export default SearchMoviesList;