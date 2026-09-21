// discountCalculator.js - Local Module for Discount Calculations

/**
 * Calculates the final price after applying a percentage discount.
 * @param {number} price - The original price in INR
 * @param {number} percent - The discount percentage (e.g., 10 for 10%)
 * @returns {number} - The final price after discount
 */
function calculateDiscount(price, percent) {
  if (percent < 0 || percent > 100) {
    throw new Error("Discount percent must be between 0 and 100.");
  }
  const discountAmount = (price * percent) / 100;
  const finalPrice = price - discountAmount;
  return finalPrice;
}

/**
 * Applies a flat coupon discount to the given price.
 * Applies ₹100 off if the couponCode is 'SAVE100'.
 * @param {number} price - The original price in INR
 * @param {string} couponCode - The coupon code to apply
 * @returns {number} - The final price after applying the coupon
 */
function applyCoupon(price, couponCode) {
  if (couponCode === "SAVE100") {
    const finalPrice = price - 100;
    console.log(`✅ Coupon '${couponCode}' applied! ₹100 discount granted.`);
    return finalPrice > 0 ? finalPrice : 0; // Price cannot go below 0
  } else {
    console.log(`❌ Invalid coupon code: '${couponCode}'. No discount applied.`);
    return price;
  }
}

// Exporting both functions using module.exports
module.exports = { calculateDiscount, applyCoupon };
