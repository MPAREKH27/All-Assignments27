// app.js - Flipkart-style Shopping Cart using discountCalculator module

// Import the local discountCalculator module
const { calculateDiscount, applyCoupon } = require("./discountCalculator");

console.log("🛒 Welcome to Flipkart-Style Shopping Cart!\n");
console.log("─".repeat(45));

// ─────────────────────────────────────────────
// Task 2: calculateDiscount usage
// ─────────────────────────────────────────────
const cartTotal = 1500;
const discountPercent = 10;

const priceAfterDiscount = calculateDiscount(cartTotal, discountPercent);

console.log(`🏷️  Original Cart Total  : ₹${cartTotal}`);
console.log(`💸  Discount Applied     : ${discountPercent}%`);
console.log(`✅  Price After Discount : ₹${priceAfterDiscount}`);

console.log("\n" + "─".repeat(45));

// ─────────────────────────────────────────────
// Task 4: applyCoupon usage
// ─────────────────────────────────────────────
console.log("\n🎟️  Applying Coupon Code...\n");

const couponCode = "SAVE100";
const finalPrice = applyCoupon(priceAfterDiscount, couponCode);

console.log(`💰  Price Before Coupon  : ₹${priceAfterDiscount}`);
console.log(`🎉  Final Price to Pay   : ₹${finalPrice}`);

console.log("\n" + "─".repeat(45));

// Testing with an invalid coupon
console.log("\n🎟️  Testing with Invalid Coupon...\n");
const invalidFinalPrice = applyCoupon(priceAfterDiscount, "FAKE50");
console.log(`💰  Price Remains        : ₹${invalidFinalPrice}`);

console.log("\n" + "─".repeat(45));
console.log("🛍️  Order Summary:");
console.log(`   Original Price  : ₹${cartTotal}`);
console.log(`   After 10% Off   : ₹${priceAfterDiscount}`);
console.log(`   After SAVE100   : ₹${finalPrice}`);
console.log("─".repeat(45));
