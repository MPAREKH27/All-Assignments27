const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS so client applications / browsers can communicate with this API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ==========================================
// SEED DATA (5 User Profiles & 10 Posts)
// ==========================================

// 1. In-memory array of 5 realistic user profiles
const profiles = [
  {
    username: "alex_wanderer",
    name: "Alex Rivera",
    followers: 14200,
    following: 340,
    bio: "Capturing moments around the world 📸✈️ | Outdoor enthusiast & landscape photographer 🏔️",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    username: "sophia_creates",
    name: "Sophia Chen",
    followers: 8950,
    following: 512,
    bio: "Digital designer & UI artist 🎨 | Turning complex ideas into delightful visuals ✨",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
  },
  {
    username: "tech_sam",
    name: "Sam Miller",
    followers: 23400,
    following: 189,
    bio: "Full-Stack Dev & Open Source enthusiast 💻 | Building the future one commit at a time 🚀",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    username: "foodie_elena",
    name: "Elena Rostova",
    followers: 5600,
    following: 430,
    bio: "Culinary explorer & home chef 🍝🍷 | Life is too short for boring meals!",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80"
  },
  {
    username: "marcus_fit",
    name: "Marcus Vance",
    followers: 11200,
    following: 275,
    bio: "Personal trainer & wellness coach 🏋️‍♂️ | Discipline over motivation 💪 Let's crush goals together",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  }
];

// 2. In-memory array of 10 realistic posts
let posts = [
  {
    postId: 1,
    username: "alex_wanderer",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    caption: "Golden hour in the Canadian Rockies. The reflection on the lake was completely still. 🌄✨",
    likes: 342,
    createdAt: "2026-10-25T08:30:00.000Z"
  },
  {
    postId: 2,
    username: "sophia_creates",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    caption: "Late night studio session experimenting with neon abstract palettes 🎨🖌️ What do you think?",
    likes: 189,
    createdAt: "2026-10-26T14:15:00.000Z"
  },
  {
    postId: 3,
    username: "tech_sam",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    caption: "Clean desk, mechanical keyboard, and a freshly brewed espresso. Ready to deploy! ☕💻",
    likes: 521,
    createdAt: "2026-10-27T09:00:00.000Z"
  },
  {
    postId: 4,
    username: "foodie_elena",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    caption: "Fresh homemade sourdough pizza with creamy burrata and basil straight from the garden 🍕🌿",
    likes: 278,
    createdAt: "2026-10-28T18:45:00.000Z"
  },
  {
    postId: 5,
    username: "marcus_fit",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    caption: "Early morning grind. No shortcuts, just consistent daily effort. Let's get it! 💥🏋️‍♂️",
    likes: 415,
    createdAt: "2026-10-29T06:10:00.000Z"
  },
  {
    postId: 6,
    username: "alex_wanderer",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    caption: "Morning fog drifting through the pine forest. Peaceful silence you can feel. 🌲🌫️",
    likes: 295,
    createdAt: "2026-10-30T07:20:00.000Z"
  },
  {
    postId: 7,
    username: "sophia_creates",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    caption: "Sneak peek of the responsive dashboard prototype I have been building this week! 📱💡",
    likes: 164,
    createdAt: "2026-10-31T11:05:00.000Z"
  },
  {
    postId: 8,
    username: "foodie_elena",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    caption: "Sunday brunch spread: avocado toast with poached eggs and microgreens 🥑🍳",
    likes: 382,
    createdAt: "2026-11-01T10:30:00.000Z"
  },
  {
    postId: 9,
    username: "tech_sam",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    caption: "Deep dive into cybersecurity and encrypted networks today. Fascinating architecture 🔒⚡",
    likes: 604,
    createdAt: "2026-11-02T16:50:00.000Z"
  },
  {
    postId: 10,
    username: "marcus_fit",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    caption: "Completed a 10km trail run at sunrise. Remember: your only competition is who you were yesterday 🏃‍♂️🔥",
    likes: 489,
    createdAt: "2026-11-03T07:00:00.000Z"
  }
];

// Helper to generate a unique postId
function generateUniquePostId() {
  if (posts.length === 0) return 1;
  const maxId = posts.reduce((max, post) => {
    const numericId = Number(post.postId);
    return !isNaN(numericId) && numericId > max ? numericId : max;
  }, 0);
  return maxId + 1;
}

// ==========================================
// ROUTES & ENDPOINTS
// ==========================================

// Root endpoint: API Overview & Documentation
app.get('/', (req, res) => {
  res.json({
    app: "insta-clone API",
    version: "1.0.0",
    description: "Instagram Clone backend built with Express.js",
    endpoints: {
      "GET /profile": "Returns a user profile (supports optional query: ?username=...)",
      "GET /profiles": "Returns all 5 seeded user profiles",
      "GET /profile/:username": "Returns a user profile by username param",
      "POST /post": "Create a new post. Body: { imageUrl, caption, [username] }",
      "GET /feed": "Returns all posts in reverse chronological order (newest first)",
      "POST /like": "Increments like count for a post. Body: { postId } or ?postId=..."
    }
  });
});

/**
 * 1. GET /profile
 * Returns a sample user profile object with username, followers, and bio fields.
 * Supports optional ?username= query parameter to query any of the seeded profiles.
 */
app.get('/profile', (req, res) => {
  const { username } = req.query;

  if (username) {
    const userProfile = profiles.find(
      p => p.username.toLowerCase() === username.toLowerCase()
    );
    if (!userProfile) {
      return res.status(404).json({
        error: `User profile with username '${username}' was not found.`
      });
    }
    return res.status(200).json(userProfile);
  }

  // Default: returns the primary sample user profile
  const sampleProfile = profiles[0];
  res.status(200).json({
    username: sampleProfile.username,
    followers: sampleProfile.followers,
    bio: sampleProfile.bio,
    name: sampleProfile.name,
    following: sampleProfile.following,
    avatarUrl: sampleProfile.avatarUrl
  });
});

/**
 * GET /profile/:username
 * Fetch profile by route parameter
 */
app.get('/profile/:username', (req, res) => {
  const { username } = req.params;
  const userProfile = profiles.find(
    p => p.username.toLowerCase() === username.toLowerCase()
  );
  if (!userProfile) {
    return res.status(404).json({
      error: `User profile with username '${username}' was not found.`
    });
  }
  res.status(200).json(userProfile);
});

/**
 * GET /profiles
 * Returns all seeded profiles
 */
app.get('/profiles', (req, res) => {
  res.status(200).json(profiles);
});

/**
 * 2. POST /post
 * Accepts a JSON body with imageUrl and caption.
 * Stores the post in the in-memory array and returns the new post with a unique postId.
 */
app.post('/post', (req, res) => {
  const { imageUrl, caption, username } = req.body;

  // Validate required fields
  if (!imageUrl || !caption) {
    return res.status(400).json({
      error: "Both 'imageUrl' and 'caption' are required in the request body."
    });
  }

  const newPost = {
    postId: generateUniquePostId(),
    username: username || profiles[0].username, // Default to primary user if not specified
    imageUrl: imageUrl.trim(),
    caption: caption.trim(),
    likes: 0,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json({
    message: "Post created successfully!",
    post: newPost
  });
});

/**
 * 3. GET /feed
 * Returns all posts in reverse order (newest first).
 * Includes username and caption for each post.
 * Uses array.reverse() on a copy so the underlying array order is preserved.
 */
app.get('/feed', (req, res) => {
  // Use array.reverse() on a shallow copy of posts to return newest first
  const feed = [...posts].reverse();

  res.status(200).json(feed);
});

/**
 * 4. POST /like
 * Accepts postId from JSON body (or query string / route param)
 * Increments the like count for that post and returns the updated like count.
 */
app.post('/like', (req, res) => {
  const postId = req.body.postId !== undefined ? req.body.postId : req.query.postId;

  if (postId === undefined || postId === null || postId === "") {
    return res.status(400).json({
      error: "A valid 'postId' is required in the request body or query parameter."
    });
  }

  // Find post by postId (supporting number or string comparisons)
  const post = posts.find(p => String(p.postId) === String(postId));

  if (!post) {
    return res.status(404).json({
      error: `Post with postId '${postId}' was not found.`
    });
  }

  // Increment like count
  post.likes = (post.likes || 0) + 1;

  res.status(200).json({
    message: "Post liked successfully!",
    postId: post.postId,
    likes: post.likes,
    updatedPost: post
  });
});

// Also support POST /like/:postId as a convenient REST route
app.post('/like/:postId', (req, res) => {
  const { postId } = req.params;
  const post = posts.find(p => String(p.postId) === String(postId));

  if (!post) {
    return res.status(404).json({
      error: `Post with postId '${postId}' was not found.`
    });
  }

  post.likes = (post.likes || 0) + 1;

  res.status(200).json({
    message: "Post liked successfully!",
    postId: post.postId,
    likes: post.likes,
    updatedPost: post
  });
});

// GET a single post by ID
app.get('/post/:postId', (req, res) => {
  const { postId } = req.params;
  const post = posts.find(p => String(p.postId) === String(postId));

  if (!post) {
    return res.status(404).json({
      error: `Post with postId '${postId}' was not found.`
    });
  }

  res.status(200).json(post);
});

// Fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found.`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

// Export app for testing, or listen if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 insta-clone server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

