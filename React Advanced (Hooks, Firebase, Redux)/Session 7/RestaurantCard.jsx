import { useFavorites } from "./FavoritesContext";
import { useUser } from "./UserContext";

const restaurants = [
  { id: 1, name: "Domino's Pizza", cuisine: "Italian", rating: "4.2", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
  { id: 2, name: "McDonald's", cuisine: "Burgers", rating: "4.0", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
  { id: 3, name: "Subway", cuisine: "Healthy", rating: "4.3", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400" },
  { id: 4, name: "KFC", cuisine: "Fried Chicken", rating: "4.1", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400" },
  { id: 5, name: "Starbucks", cuisine: "Cafe", rating: "4.5", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400" },
];

function RestaurantCard({ restaurant }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFav = favorites.includes(restaurant.id);

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl w-full">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-bold text-lg">{restaurant.name}</h3>
        <p className="text-gray-400 text-sm">{restaurant.cuisine}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-green-400 font-semibold text-sm">
            ★ {restaurant.rating}
          </span>
          <button
            onClick={() =>
              isFav ? removeFavorite(restaurant.id) : addFavorite(restaurant.id)
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              isFav
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {isFav ? "❤ Remove" : "🤍 Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RestaurantList() {
  const user = useUser();
  const { favorites, clearAll } = useFavorites();

  return (
    <div className="bg-gray-850 rounded-2xl p-6 shadow-2xl w-full max-w-3xl bg-gray-900/50">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Zomato Favorites</h2>
          <p className="text-gray-400 text-xs">
            Logged in as <span className="text-purple-400">{user.name}</span> ·{" "}
            {favorites.length} favorite{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </div>
  );
}

export { restaurants, RestaurantList };