function Comparison() {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        Context API → Redux: Refactor Notes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded-xl p-4">
          <h3 className="text-green-400 font-bold text-sm mb-2">
            ✅ Advantage of Redux
          </h3>
          <p className="text-gray-300 text-xs leading-relaxed">
            Redux DevTools gives you <span className="text-white font-semibold">time-travel debugging</span> —
            you can inspect every action, see the exact state diff after each dispatch,
            and replay actions. With Context API, you have no built-in way to inspect
            state transitions or undo/redo. The action/reducer pattern also makes
            state changes <span className="text-white font-semibold">predictable and testable</span> in isolation.
          </p>
        </div>

        <div className="bg-gray-700 rounded-xl p-4">
          <h3 className="text-red-400 font-bold text-sm mb-2">
            ❌ Disadvantage of Redux
          </h3>
          <p className="text-gray-300 text-xs leading-relaxed">
            Redux adds <span className="text-white font-semibold">boilerplate and setup cost</span> —
            you need actions, action types, reducers, and a store configuration
            even for simple features. Context API with useReducer handles the same
            cart logic with <span className="text-white font-semibold">fewer files and less code</span>.
            For a small shopping cart, Redux's extra abstraction layer is overkill.
          </p>
        </div>
      </div>

      <div className="mt-4 bg-gray-700 rounded-xl p-4">
        <h3 className="text-purple-400 font-bold text-sm mb-2">
          📁 File Comparison
        </h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-gray-400 mb-1 font-semibold">Context API version:</p>
            <p className="text-gray-300">cartContext.js (1 file, ~40 lines)</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1 font-semibold">Redux Toolkit version:</p>
            <p className="text-gray-300">cartSlice.js + store.js (2 files, ~30 lines)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comparison;