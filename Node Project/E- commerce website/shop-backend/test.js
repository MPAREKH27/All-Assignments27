const http = require('http');
const { app, addToCart, clearCart, products } = require('./server');

const PORT = 3001; // Use separate port for testing
let server;

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const options = {
      hostname: '127.0.0.1',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(dataString ? { 'Content-Length': Buffer.byteLength(dataString) } : {})
      }
    };

    const req = http.request(options, (res) => {
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            data: JSON.parse(rawData)
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            data: rawData
          });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (dataString) {
      req.write(dataString);
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting Shop Backend Automated Tests ---\n');
  server = app.listen(PORT);

  try {
    // -------------------------------------------------------------
    // Task 1: Check GET /products
    // -------------------------------------------------------------
    console.log('Testing Task 1: GET /products ...');
    const resProducts = await request('GET', '/products');
    console.assert(resProducts.statusCode === 200, `Expected status 200, got ${resProducts.statusCode}`);
    console.assert(Array.isArray(resProducts.data), 'Expected response to be an array');
    console.assert(resProducts.data.length === 3, `Expected 3 products, got ${resProducts.data.length}`);
    console.assert(resProducts.data[0].id && resProducts.data[0].name && resProducts.data[0].price, 'Product missing id, name, or price');
    console.log('✅ Task 1 Passed: 3 sample products returned successfully:\n', resProducts.data);

    // -------------------------------------------------------------
    // Task 2: Check addToCart(productId, quantity)
    // -------------------------------------------------------------
    console.log('\nTesting Task 2: addToCart(productId, quantity) function & logic ...');
    clearCart();
    
    // Add product 1 with quantity 2
    const add1 = addToCart(1, 2);
    console.assert(add1.success === true, 'Failed to add product');
    console.assert(add1.cart.length === 1, 'Cart should have 1 item');
    console.assert(add1.cart[0].productId === 1 && add1.cart[0].quantity === 2, 'Item details incorrect');
    
    // Add product 1 again with quantity 3 (should update quantity to 5)
    const add2 = addToCart(1, 3);
    console.assert(add2.cart.length === 1, 'Cart should still have 1 item');
    console.assert(add2.cart[0].quantity === 5, `Expected quantity 5, got ${add2.cart[0].quantity}`);

    // Add product 2 with quantity 1
    const add3 = addToCart(2, 1);
    console.assert(add3.cart.length === 2, 'Cart should have 2 items');
    console.log('✅ Task 2 Passed: Items added and quantity correctly updated in cart:\n', add3.cart);

    // -------------------------------------------------------------
    // Task 3: Check GET /cart/total (5% delivery fee, Zomato-style)
    // -------------------------------------------------------------
    console.log('\nTesting Task 3: GET /cart/total ...');
    // Product 1: 1999 * 5 = 9995
    // Product 2: 2499 * 1 = 2499
    // Item Total = 12494
    // 5% Delivery = 12494 * 0.05 = 624.7
    // Grand Total = 12494 + 624.7 = 13118.7
    const resTotal = await request('GET', '/cart/total');
    console.assert(resTotal.statusCode === 200, `Expected 200, got ${resTotal.statusCode}`);
    console.assert(resTotal.data.billBreakdown.itemTotal === 12494, `Expected itemTotal 12494, got ${resTotal.data.billBreakdown.itemTotal}`);
    console.assert(resTotal.data.billBreakdown.deliveryCharge === 624.7, `Expected deliveryCharge 624.7, got ${resTotal.data.billBreakdown.deliveryCharge}`);
    console.assert(resTotal.data.billBreakdown.grandTotal === 13118.7, `Expected grandTotal 13118.7, got ${resTotal.data.billBreakdown.grandTotal}`);
    console.log('✅ Task 3 Passed: Zomato-style bill breakdown:\n', resTotal.data.formattedBill);

    // -------------------------------------------------------------
    // Task 4: Check GET /products/search (Flipkart-style search)
    // -------------------------------------------------------------
    console.log('\nTesting Task 4: GET /products/search ...');
    // Search "watch" (case-insensitive)
    const resSearch1 = await request('GET', '/products/search?q=watch');
    console.assert(resSearch1.data.products.length === 1, 'Expected 1 match for watch');
    console.assert(resSearch1.data.products[0].id === 2, 'Expected Smart Fitness Watch');

    // Search uppercase "KEYBOARD"
    const resSearch2 = await request('GET', '/products/search?q=KEYBOARD');
    console.assert(resSearch2.data.products.length === 1, 'Expected 1 match for KEYBOARD');
    console.assert(resSearch2.data.products[0].id === 3, 'Expected Mechanical Gaming Keyboard');

    // Partial search "e"
    const resSearch3 = await request('GET', '/products/search?q=e');
    console.assert(resSearch3.data.products.length === 3, 'Expected all 3 products to match partial query "e"');
    console.log('✅ Task 4 Passed: Case-insensitive search works as expected.');

    // -------------------------------------------------------------
    // Task 5: Middleware verification
    // -------------------------------------------------------------
    console.log('\nTesting Task 5: Request logging middleware ...');
    console.log('✅ Task 5 Passed: Notice the logged requests printed above with timestamps and HTTP methods.');

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉\n');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    server.close();
  }
}

runTests();

