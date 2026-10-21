async function testAll() {
  console.log('--- Testing API Endpoints ---');

  // Test 1: POST /playlists
  try {
    const res1 = await fetch('http://localhost:5000/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Lo-Fi Chill Beats' })
    });
    const data1 = await res1.json();
    console.log('[Task 1] POST /playlists ->', res1.status, data1);
  } catch (e) {
    console.error('Task 1 failed:', e.message);
  }

  // Test 2: POST /restaurants
  try {
    const res2 = await fetch('http://localhost:5000/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Trattoria Bella', cuisine: 'Italian', rating: 4.8 })
    });
    const data2 = await res2.json();
    console.log('[Task 2] POST /restaurants ->', res2.status, data2);
  } catch (e) {
    console.error('Task 2 failed:', e.message);
  }

  // Test 3: POST /movies/seed then GET /movies
  try {
    await fetch('http://localhost:5000/movies/seed', { method: 'POST' });
    const res3 = await fetch('http://localhost:5000/movies');
    const data3 = await res3.json();
    console.log(`[Task 3] GET /movies -> ${res3.status}, fetched ${data3.length} movies:`, data3.map(m => m.title));
  } catch (e) {
    console.error('Task 3 failed:', e.message);
  }

  // Test 4: Error Handling (Task 4)
  try {
    const res4 = await fetch('http://localhost:5000/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }) // Invalid empty name
    });
    const data4 = await res4.json();
    console.log('[Task 4] Error test (empty playlist name) -> status:', res4.status, data4);
  } catch (e) {
    console.error('Task 4 failed:', e.message);
  }
}

testAll();
