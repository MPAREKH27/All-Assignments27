import { useState, useMemo } from "react";

function generateProducts(count) {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 9000) + 1000,
    });
  }
  return products;
}

const allProducts = generateProducts(1000);

function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [renderTime, setRenderTime] = useState(null);

  const startTime = performance.now();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const endTime = performance.now();

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-2">
        Product List ({allProducts.length} items)
      </h2>

      <p className="text-gray-400 text-xs mb-4">
        Filter render time: {(endTime - startTime).toFixed(2)}ms
      </p>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 mb-4"
      />

      <p className="text-gray-400 text-sm mb-2">
        Showing {filteredProducts.length} products
      </p>

      <div
        className="overflow-y-auto max-h-[400px] bg-gray-900 rounded-xl p-3 space-y-2"
        onScroll={(e) => {
          if (!renderTime) {
            setRenderTime((endTime - startTime).toFixed(2));
          }
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-2"
          >
            <span className="text-white text-sm">{product.name}</span>
            <span className="text-green-400 font-semibold text-sm">
              ₹{product.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;