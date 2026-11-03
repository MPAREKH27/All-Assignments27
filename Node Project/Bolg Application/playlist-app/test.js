const http = require('http');
const app = require('./index');

async function runTests() {
  console.log("=== Starting Playlist App Test Suite ===\n");

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Test Root Route GET /
    console.log("1. Testing Root Route GET /");
    const resRoot = await fetch(`${baseUrl}/`);
    const textRoot = await resRoot.text();
    assert(resRoot.status === 200, "Root route status is 200");
    assert(textRoot === "Welcome to Playlist App", `Root route returns 'Welcome to Playlist App' (received: "${textRoot}")`);

    // 2. Test GET /songs
    console.log("\n2. Testing GET /songs");
    const resSongs = await fetch(`${baseUrl}/songs`);
    const songsData = await resSongs.json();
    assert(resSongs.status === 200, "GET /songs status is 200");
    assert(Array.isArray(songsData), "GET /songs returns an array");
    assert(songsData.length === 3, `Initial song count is 3 (received: ${songsData.length})`);
    assert(songsData[0].title === "Bohemian Rhapsody", "First song is Bohemian Rhapsody");

    // 3. Test POST /songs validation with invalid data
    console.log("\n3. Testing POST /songs Validation (Invalid Inputs)");

    // Test 3a: Empty title
    const resEmptyTitle = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "", artist: "Coldplay", duration: 240 })
    });
    const emptyTitleData = await resEmptyTitle.json();
    assert(resEmptyTitle.status === 400, "Empty title returns 400 Bad Request");
    assert(emptyTitleData.errors.some(e => e.includes("Title is required")), "Error message mentions title requirement");

    // Test 3b: Whitespace only title
    const resWhitespaceTitle = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "   ", artist: "Coldplay", duration: 240 })
    });
    assert(resWhitespaceTitle.status === 400, "Whitespace-only title returns 400 Bad Request");

    // Test 3c: Missing title
    const resMissingTitle = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artist: "Coldplay", duration: 240 })
    });
    assert(resMissingTitle.status === 400, "Missing title returns 400 Bad Request");

    // Test 3d: Negative duration
    const resNegDuration = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "Yellow", artist: "Coldplay", duration: -120 })
    });
    const negDurationData = await resNegDuration.json();
    assert(resNegDuration.status === 400, "Negative duration returns 400 Bad Request");
    assert(negDurationData.errors.some(e => e.includes("Duration must be a positive number")), "Error message mentions duration requirement");

    // Test 3e: Zero duration
    const resZeroDuration = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "Yellow", artist: "Coldplay", duration: 0 })
    });
    assert(resZeroDuration.status === 400, "Zero duration returns 400 Bad Request");

    // Test 3f: String / NaN duration
    const resStringDuration = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "Yellow", artist: "Coldplay", duration: "not-a-number" })
    });
    assert(resStringDuration.status === 400, "String/NaN duration returns 400 Bad Request");

    // Test 3g: Both title and duration invalid
    const resBothInvalid = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "", duration: -10 })
    });
    const bothInvalidData = await resBothInvalid.json();
    assert(resBothInvalid.status === 400, "Both invalid returns 400 Bad Request");
    assert(bothInvalidData.errors.length === 2, `Both error messages captured (count: ${bothInvalidData.errors.length})`);

    // 4. Test POST /songs with valid data
    console.log("\n4. Testing POST /songs with Valid Input");
    const validSongPayload = {
      title: "Levitating",
      artist: "Dua Lipa",
      duration: 203
    };
    const resValid = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validSongPayload)
    });
    const updatedSongs = await resValid.json();
    assert(resValid.status === 201, "Valid POST /songs returns 201 Created");
    assert(Array.isArray(updatedSongs), "Returns updated song list as an array");
    assert(updatedSongs.length === 4, `Song count increased to 4 (received: ${updatedSongs.length})`);
    const lastSong = updatedSongs[updatedSongs.length - 1];
    assert(lastSong.title === "Levitating" && lastSong.artist === "Dua Lipa" && lastSong.duration === 203, "New song correctly added with all properties");

    // 5. Test GET /songs reflects the updated list
    console.log("\n5. Verifying GET /songs has the updated list");
    const resGetAfterPost = await fetch(`${baseUrl}/songs`);
    const songsAfter = await resGetAfterPost.json();
    assert(songsAfter.length === 4, `GET /songs confirms 4 total songs`);

    console.log(`\n========================================`);
    console.log(`Tests Finished: ${passed} Passed, ${failed} Failed`);
    console.log(`========================================`);

  } catch (err) {
    console.error("Test execution error:", err);
    failed++;
  } finally {
    server.close();
  }

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();

