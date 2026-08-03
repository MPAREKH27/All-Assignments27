import { useReducer } from "react";

const initialState = { quantity: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { quantity: state.quantity + 1 };
    case "DECREMENT":
      if (state.quantity === 1) return state;
      return { quantity: state.quantity - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function CartItem({ name, price, image }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="bg-gray-800 rounded-2xl p-5 shadow-2xl w-full max-w-sm flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded-xl"
      />

      <div className="flex-1">
        <h3 className="text-white font-semibold text-sm truncate">{name}</h3>
        <p className="text-green-400 font-bold text-lg">
          ₹{price}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => dispatch({ type: "DECREMENT" })}
            disabled={state.quantity === 1}
            className="w-8 h-8 rounded-lg bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg flex items-center justify-center transition-colors"
          >
            -
          </button>

          <span className="text-white font-bold text-lg w-8 text-center">
            {state.quantity}
          </span>

          <button
            onClick={() => dispatch({ type: "INCREMENT" })}
            className="w-8 h-8 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-lg flex items-center justify-center transition-colors"
          >
            +
          </button>

          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="ml-2 px-3 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="text-gray-400 text-xs">Total</p>
        <p className="text-purple-400 font-bold text-lg">
          ₹{price * state.quantity}
        </p>
      </div>
    </div>
  );
}

export default CartItem;