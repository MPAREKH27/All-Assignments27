const app = require('./server');

const PORT = 3050;
const BASE_URL = `http://localhost:${PORT}`;

async function runTests() {
  const server = app.listen(PORT);

  await new Promise((resolve) => server.once('listening', resolve));
  console.log(`\n🧪 Starting insta-clone test suite on ${BASE_URL}...\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Test Root /
    console.log('--- Test 0: GET / (Overview) ---');
    const rootRes = await fetch(`${BASE_URL}/`);
    const rootData = await rootRes.json();
    assert(rootRes.status === 200, 'GET / returns 200 OK');
    assert(rootData.app === 'insta-clone API', 'Root metadata contains app name');

    // 2. Test GET /profile (Requirement 1 & 5)
    console.log('\n--- Test 1: GET /profile (Requirement 1 & 5) ---');
    const profileRes = await fetch(`${BASE_URL}/profile`);
    const profileData = await profileRes.json();
    assert(profileRes.status === 200, 'GET /profile returns 200 OK');
    assert(typeof profileData.username === 'string', `profile has username: "${profileData.username}"`);
    assert(typeof profileData.followers === 'number', `profile has followers: ${profileData.followers}`);
    assert(typeof profileData.bio === 'string', `profile has bio: "${profileData.bio}"`);

    // Test specific user profile
    const specificProfileRes = await fetch(`${BASE_URL}/profile?username=sophia_creates`);
    const specificProfileData = await specificProfileRes.json();
    assert(specificProfileRes.status === 200, 'GET /profile?username=sophia_creates returns 200');
    assert(specificProfileData.username === 'sophia_creates', 'Returned profile username matches requested user');

    // Test all profiles
    const allProfilesRes = await fetch(`${BASE_URL}/profiles`);
    const allProfilesData = await allProfilesRes.json();
    assert(Array.isArray(allProfilesData) && allProfilesData.length === 5, 'GET /profiles returns 5 seeded user profiles');

    // 3. Test GET /feed (Requirement 3 & 5)
    console.log('\n--- Test 2: GET /feed (Requirement 3 & 5) ---');
    const feedRes = await fetch(`${BASE_URL}/feed`);
    const feedData = await feedRes.json();
    assert(feedRes.status === 200, 'GET /feed returns 200 OK');
    assert(Array.isArray(feedData), 'GET /feed returns an array');
    assert(feedData.length === 10, 'Feed contains 10 seeded posts');
    assert(feedData[0].postId === 10, 'First item in feed is newest seeded post (postId 10)');
    assert(feedData[feedData.length - 1].postId === 1, 'Last item in feed is oldest seeded post (postId 1)');
    assert(typeof feedData[0].username === 'string' && typeof feedData[0].caption === 'string', 'Post contains username and caption');

    // 4. Test POST /post (Requirement 2)
    console.log('\n--- Test 3: POST /post (Requirement 2) ---');
    const newPostPayload = {
      imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      caption: "A quiet moment with a cup of coffee and clean code. ☕💻",
      username: "tech_sam"
    };
    const createPostRes = await fetch(`${BASE_URL}/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPostPayload)
    });
    const createPostData = await createPostRes.json();
    assert(createPostRes.status === 201, 'POST /post returns 201 Created');
    assert(createPostData.post && createPostData.post.postId !== undefined, `Returns new post with unique postId: ${createPostData.post?.postId}`);
    assert(createPostData.post.caption === newPostPayload.caption, 'Post caption matches submitted caption');
    assert(createPostData.post.imageUrl === newPostPayload.imageUrl, 'Post imageUrl matches submitted imageUrl');
    assert(createPostData.post.likes === 0, 'New post initialized with 0 likes');

    const createdPostId = createPostData.post.postId;

    // 5. Test GET /feed again to verify new post is at the top
    console.log('\n--- Test 4: GET /feed order after new post ---');
    const updatedFeedRes = await fetch(`${BASE_URL}/feed`);
    const updatedFeedData = await updatedFeedRes.json();
    assert(updatedFeedData.length === 11, 'Feed now has 11 posts');
    assert(updatedFeedData[0].postId === createdPostId, `Newly created post (id ${createdPostId}) is first in feed (newest first)`);

    // 6. Test POST /like (Requirement 4)
    console.log('\n--- Test 5: POST /like (Requirement 4) ---');
    const likeRes1 = await fetch(`${BASE_URL}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: createdPostId })
    });
    const likeData1 = await likeRes1.json();
    assert(likeRes1.status === 200, 'POST /like returns 200 OK');
    assert(likeData1.likes === 1, `Like count incremented to 1 (got: ${likeData1.likes})`);

    // Like again
    const likeRes2 = await fetch(`${BASE_URL}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: createdPostId })
    });
    const likeData2 = await likeRes2.json();
    assert(likeData2.likes === 2, `Like count incremented to 2 (got: ${likeData2.likes})`);

    // Like existing seeded post
    const seedPostLikeRes = await fetch(`${BASE_URL}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: 1 })
    });
    const seedPostLikeData = await seedPostLikeRes.json();
    assert(seedPostLikeData.likes === 343, `Seed post 1 likes incremented from 342 to 343 (got: ${seedPostLikeData.likes})`);

    // 7. Test validation & edge cases
    console.log('\n--- Test 6: Validation & Error Handling ---');
    const invalidPostRes = await fetch(`${BASE_URL}/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caption: "Missing imageUrl" })
    });
    assert(invalidPostRes.status === 400, 'POST /post missing imageUrl returns 400 Bad Request');

    const missingLikeRes = await fetch(`${BASE_URL}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert(missingLikeRes.status === 400, 'POST /like missing postId returns 400 Bad Request');

    const notFoundLikeRes = await fetch(`${BASE_URL}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: 999999 })
    });
    assert(notFoundLikeRes.status === 404, 'POST /like non-existent postId returns 404 Not Found');

  } catch (err) {
    console.error('Unexpected test error:', err);
    failed++;
  } finally {
    await new Promise((resolve) => server.close(resolve));
    console.log(`\n========================================`);
    console.log(`📊 Test Summary: ${passed} Passed, ${failed} Failed`);
    console.log(`========================================\n`);
    process.exitCode = failed > 0 ? 1 : 0;
  }
}

runTests();
