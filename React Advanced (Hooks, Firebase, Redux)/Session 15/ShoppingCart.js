import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "./cartSlice";

const products = [
  { id: 101, name: "iPhone 15", price: 134900 },
  { id: 102, name: "MacBook Air", price: 99900 },
  { id: 103, name: "AirPods Pro", price: 24900 },
];

function ShoppingCart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-1">Shopping Cart (Redux)</h2>
      <p className="text-gray-400 text-xs mb-4">
        Refactored from Context API → Redux Toolkit · {items.length} item{items.length !== 1 ? "s" : ""}
      </p>

      <div className="flex gap-2 mb-4">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => dispatch(addItem(p))}
            className="flex-1 px-3 py-2 rounded-xl bg-purple-500 text-white text-xs font-semibold hover:bg-purple-600 transition-colors"
          >
            + {p.name}
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-gray-500 text-center py-6 text-sm">Cart is empty</p>
      )}

      <div className="space-y-2 max-h-[200px] overflow-y-auto mb-3">
        {items.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-2"
          >
            <span className="text-white text-sm">{item.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xs font-semibold">₹{item.price.toLocaleString()}</span>
              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="flex justify-between items-center border-t border-gray-700 pt-3">
          <span className="text-white font-bold">Total</span>
          <span className="text-green-400 font-bold text-lg">₹{total.toLocaleString()}</span>
        </div>
      )}

      {items.length > 0 && (
        <button
          onClick={() => dispatch(clearCart())}
          className="w-full mt-3 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}

export default ShoppingCart;