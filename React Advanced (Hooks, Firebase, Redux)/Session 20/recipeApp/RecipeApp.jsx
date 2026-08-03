import { useState } from "react";

const initialRecipes = [
  { id: 1, name: "Butter Chicken", cuisine: "Indian", time: "40 min", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400" },
  { id: 2, name: "Margherita Pizza", cuisine: "Italian", time: "25 min", image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400" },
  { id: 3, name: "Sushi Roll", cuisine: "Japanese", time: "50 min", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400" },
  { id: 4, name: "Tacos", cuisine: "Mexican", time: "20 min", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400" },
  { id: 5, name: "Pad Thai", cuisine: "Thai", time: "30 min", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400" },
  { id: 6, name: "Biryani", cuisine: "Indian", time: "55 min", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400" },
];

function RecipeCard({ recipe }) {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform">
      <img src={recipe.image} alt={recipe.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-white font-bold text-lg">{recipe.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-purple-400 text-xs font-semibold">{recipe.cuisine}</span>
          <span className="text-gray-400 text-xs">⏱ {recipe.time}</span>
        </div>
      </div>
    </div>
  );
}

function RecipeApp() {
  const [search, setSearch] = useState("");

  const filtered = initialRecipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-1">Recipe Sharing App</h2>
      <p className="text-gray-400 text-xs mb-4">Firebase Hosting Ready</p>

      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 text-sm mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center py-6 text-sm">No recipes found.</p>
      )}
    </div>
  );
}

export default RecipeApp;