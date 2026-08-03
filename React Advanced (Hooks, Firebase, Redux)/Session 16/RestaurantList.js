import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurants } from "./restaurantSlice";

function RestaurantList() {
  const { data, loading, error } = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Dispatching fetchRestaurants thunk...");
    dispatch(fetchRestaurants()).then((action) => {
      console.log("Thunk completed:", action);
      console.log("Payload:", action.payload);
    });
  }, [dispatch]);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-1">Restaurant List</h2>
      <p className="text-gray-400 text-xs mb-4">
        Redux Thunk · Async API fetch · {data.length} restaurants loaded
      </p>

      {loading && (
        <div className="flex items-center gap-3 py-8 justify-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400 text-sm">Fetching restaurants...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-xl px-4 py-3 mb-4">
          <p className="text-red-400 text-sm font-semibold">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchRestaurants())}
            className="mt-2 px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-gray-500 text-center py-6 text-sm">
          No restaurants loaded yet.
        </p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="overflow-y-auto max-h-[400px] bg-gray-900 rounded-xl p-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.slice(0, 100).map((r, i) => (
              <div
                key={r.id || i}
                className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-2"
              >
                <div>
                  <h4 className="text-white font-semibold text-sm truncate">
                    {r.name}
                  </h4>
                  <p className="text-gray-400 text-xs">{r.cuisine || r.city || "Various"}</p>
                </div>
                {r.rating && (
                  <span className="text-green-400 text-xs font-bold">
                    ★ {r.rating}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantList;