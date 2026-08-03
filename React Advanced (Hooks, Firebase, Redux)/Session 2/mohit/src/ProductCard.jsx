import PropTypes from "prop-types";

// ══════════════════════════════════════════════════════════════
// Q1 (Session-3) — ProductCard Component
// Props: productName (string), price (number)
// PropTypes validation ensures correct prop types at runtime.
// ══════════════════════════════════════════════════════════════
function ProductCard({ productName, price }) {
  return (
    <div className="pc-card">
      {/* Gradient badge */}
      <div className="pc-badge">🛍️</div>

      <div className="pc-body">
        <h3 className="pc-name">{productName}</h3>
        <p className="pc-price">
          <span className="pc-currency">₹</span>
          {price.toLocaleString("en-IN")}
        </p>
      </div>

      <button className="pc-btn" id={`buy-${productName.replace(/\s+/g, "-").toLowerCase()}`}>
        Add to Cart 🛒
      </button>

      {/* PropTypes annotation note */}
      <p className="pc-prop-note">
        <code>productName</code>: <em>PropTypes.string.isRequired</em> &nbsp;|&nbsp;
        <code>price</code>: <em>PropTypes.number.isRequired</em>
      </p>
    </div>
  );
}

// ── Prop-Type Validation ──────────────────────────────────────
ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  price:       PropTypes.number.isRequired,
};

export default ProductCard;
