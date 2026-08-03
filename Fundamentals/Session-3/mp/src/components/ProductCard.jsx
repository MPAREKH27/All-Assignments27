// Task 1: Functional component that accepts productName and price props
// Task 4: prop-types validation added for productName (string) and price (number)

import PropTypes from "prop-types";

function ProductCard({ productName, price }) {
  return (
    <div className="product-card">
      <div className="product-badge">🛒 Product</div>
      <h2 className="product-name">{productName}</h2>
      <div className="product-price-row">
        <span className="product-currency">₹</span>
        <span className="product-price">{price.toLocaleString("en-IN")}</span>
      </div>
      <button className="product-btn">Add to Cart</button>
    </div>
  );
}

// Task 4: PropTypes validation
ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
