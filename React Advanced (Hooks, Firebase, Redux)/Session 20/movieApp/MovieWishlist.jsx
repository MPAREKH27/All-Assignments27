import { useState, useCallback, useMemo } from "react";

const initialMovies = [
  { id: 1, title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400" },
  { id: 2, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400" },
  { id: 3, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400" },
  { id: 4, title: "Pulp Fiction", year: 1994, genre: "Crime", rating: 8.9, poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400" },
  { id: 5, title: "The Matrix", year: 1999, genre: "Sci-Fi", rating: 8.7, poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" },
  { id: 6, title: "Parasite", year: 2019, genre: "Thriller", rating: 8.5, poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400" },
  { id: 7, title: "Dangal", year: 2016, genre: "Drama", rating: 8.4, poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400" },
  { id: 8, title: "3 Idiots", year: 2009, genre: "Comedy", rating: 8.4, poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400" },
];

const MovieCard = React.memo(function MovieCard({ movie, onToggleWishlist, isWishlisted }) {
  console.log(`Rendering MovieCard: ${movie.title}`);

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-white font-bold text-sm">{movie.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-gray-400 text-xs">{movie.year} · {movie.genre}</span>
          <span className="text-yellow-400 text-xs font-bold">★ {movie.rating}</span>
        </div>
        <button
          onClick={() => onToggleWishlist(movie.id)}
          className={`w-full mt-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
            isWishlisted
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          {isWishlisted ? "❤ Remove from Wishlist" : "🤍 Add to Wishlist"}
        </button>
      </div>
    </div>
  );
});

function MovieWishlist() {
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const filtered = useMemo(
    () =>
      initialMovies.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl w-full max-w-3xl">
      <h2 className="text-2xl font-bold text-white mb-1">Movie Wishlist</h2>
      <p className="text-gray-400 text-xs mb-4">
        Netlify Ready · {wishlist.length} wishlisted · Optimized with React.memo + useCallback
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 text-sm"
        />
        {wishlist.length > 0 && (
          <span className="px-4 py-3 rounded-xl bg-purple-500/20 text-purple-400 text-xs font-semibold">
            ❤ {wishlist.length}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleWishlist={toggleWishlist}
            isWishlisted={wishlist.includes(movie.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center py-6 text-sm">No movies found.</p>
      )}
    </div>
  );
}

import React from "react";
export default MovieWishlist;