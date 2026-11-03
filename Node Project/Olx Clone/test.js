// Comprehensive automated test suite for the OLX Clone Express API
const http = require('http');
const app = require('./server');

const PORT = 3001;

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path,
      method,
      headers: { ...headers }
    };

    let postData = null;
    if (body) {
      postData = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          parsed = data;
        }
        resolve({ status: res.statusCode, data: parsed, headers: res.headers });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  const server = app.listen(PORT, async () => {
    console.log(`\n=== Running API Tests on http://localhost:${PORT} ===\n`);
    let passed = 0;
    let failed = 0;

    function assert(condition, message) {
      if (condition) {
        console.log(`[PASS] ${message}`);
        passed++;
      } else {
        console.error(`[FAIL] ${message}`);
        failed++;
      }
    }

    try {
      // 1. Test GET /products
      console.log('--- Testing Question 1: GET /products ---');
      const res1 = await request('GET', '/products');
      assert(res1.status === 200, 'GET /products returns status 200');
      assert(Array.isArray(res1.data), 'GET /products returns an array');
      assert(res1.data.length >= 5, `GET /products returns listings (count: ${res1.data.length})`);
      assert(res1.data[0].id && res1.data[0].title && res1.data[0].price !== undefined && res1.data[0].imageUrl,
        'Listing has id, title, price, and imageUrl');

      // 2. Test POST /add-product
      console.log('\n--- Testing Question 2: POST /add-product ---');
      const newProductData = {
        title: 'MacBook Air M2 16GB RAM 512GB SSD - Midnight',
        price: 89000,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'
      };
      const res2 = await request('POST', '/add-product', newProductData);
      assert(res2.status === 201, 'POST /add-product returns status 201');
      assert(res2.data.updatedProducts && Array.isArray(res2.data.updatedProducts),
        'POST /add-product returns updated list of products');
      const added = res2.data.updatedProducts.find(p => p.title === newProductData.title);
      assert(added !== undefined, 'New product is present in the updated products list');
      assert(added.id !== undefined, `New product assigned an id (${added?.id})`);

      // 2b. Test POST /add-product validation
      const res2Invalid = await request('POST', '/add-product', { title: 'No price' });
      assert(res2Invalid.status === 400, 'POST /add-product returns 400 when fields are missing');

      // 3. Test GET /products/:id
      console.log('\n--- Testing Question 3: GET /products/:id ---');
      const res3Found = await request('GET', '/products/1');
      assert(res3Found.status === 200, 'GET /products/1 returns status 200');
      assert(res3Found.data.id === 1, 'GET /products/1 returns product with id 1');
      assert(res3Found.data.title.includes('iPhone'), 'GET /products/1 matches product title');

      // 3b. Test GET /products/:id 404 constraint
      const res3NotFound = await request('GET', '/products/99999');
      assert(res3NotFound.status === 404, 'GET /products/99999 returns 404 error');
      assert(res3NotFound.data.error !== undefined, `404 response includes error message: "${res3NotFound.data.error}"`);

      // 4. Test DELETE /products/:id
      console.log('\n--- Testing Question 4: DELETE /products/:id ---');
      const deleteId = added.id;
      const initialCount = res2.data.updatedProducts.length;
      const res4 = await request('DELETE', `/products/${deleteId}`);
      assert(res4.status === 200, `DELETE /products/${deleteId} returns status 200`);
      assert(res4.data.updatedProducts && Array.isArray(res4.data.updatedProducts),
        'DELETE /products/:id returns updated product list');
      assert(res4.data.updatedProducts.length === initialCount - 1,
        `Updated product list decreased by 1 (new count: ${res4.data.updatedProducts.length})`);
      assert(!res4.data.updatedProducts.some(p => p.id === deleteId),
        `Product with id ${deleteId} was removed from array`);

      // 4b. Test DELETE /products/:id 404
      const res4NotFound = await request('DELETE', '/products/99999');
      assert(res4NotFound.status === 404, 'DELETE /products/99999 returns 404 error');

      console.log('\n=========================================');
      console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
      console.log('=========================================\n');
    } catch (err) {
      console.error('Test execution failed:', err);
    } finally {
      server.close(() => {
        process.exit(failed > 0 ? 1 : 0);
      });
    }
  });
}

runTests();

