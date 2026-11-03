const app = require('./app');
const http = require('http');

function mockRequest(method, url) {
  return new Promise((resolve, reject) => {
    const req = new http.IncomingMessage(null);
    req.method = method;
    req.url = url;

    let headers = {};
    let body = '';

    const res = {
      statusCode: 200,
      setHeader(k, v) { headers[k] = v; },
      status(code) { this.statusCode = code; return this; },
      send(data) {
        body = data;
        resolve({ status: this.statusCode, headers, body });
      },
      json(data) {
        body = data;
        resolve({ status: this.statusCode, headers, body });
      },
      end(data) {
        if (data) body = data;
        resolve({ status: this.statusCode, headers, body });
      }
    };

    app.handle(req, res, (err) => {
      if (err) reject(err);
      else resolve({ status: 404, headers, body: 'Not Found' });
    });
  });
}

async function runTests() {
  console.log('Running StayEZ API Tests...\n');

  // Test 1: GET /
  const homeRes = await mockRequest('GET', '/');
  console.log('✓ GET / ->', homeRes.body);
  if (homeRes.body !== 'Welcome to StayEZ') throw new Error('Root route test failed');

  // Test 2: GET /rooms
  const roomsRes = await mockRequest('GET', '/rooms');
  console.log(`✓ GET /rooms -> Returned ${roomsRes.body.length} rooms`);
  if (!Array.isArray(roomsRes.body) || roomsRes.body.length !== 5) throw new Error('Expected 5 rooms');

  // Test 3: GET /rooms/search?location=Goa
  const goaRes = await mockRequest('GET', '/rooms/search?location=Goa');
  console.log('✓ GET /rooms/search?location=Goa -> Found:', goaRes.body.map(r => r.title));
  if (goaRes.body.length !== 1 || goaRes.body[0].location !== 'Goa') throw new Error('Location filter for Goa failed');

  // Test 4: GET /rooms/search?location=manali (case-insensitive)
  const manaliRes = await mockRequest('GET', '/rooms/search?location=manali');
  console.log('✓ GET /rooms/search?location=manali -> Found:', manaliRes.body.map(r => r.title));
  if (manaliRes.body.length !== 1 || manaliRes.body[0].location !== 'Manali') throw new Error('Location filter for Manali failed');

  // Test 5: GET /rooms/search without query param
  const missingRes = await mockRequest('GET', '/rooms/search');
  console.log('✓ GET /rooms/search (missing location) -> Status:', missingRes.status);
  if (missingRes.status !== 400) throw new Error('Missing location param should return 400');

  console.log('\nAll 5 test suites passed! ✅');
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

