import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      if (state.count === 0) return state;
      return { count: state.count - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function PlaylistCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl w-full max-w-sm text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Playlist Counter</h2>
      <p className="text-gray-400 text-sm mb-6">Manage your song count</p>

      <div className="text-7xl font-extrabold text-purple-400 mb-8">
        {state.count}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          disabled={state.count === 0}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          - Remove
        </button>

        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
        >
          Reset
        </button>

        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

export default PlaylistCounter;