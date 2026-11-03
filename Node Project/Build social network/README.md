# 📸 insta-clone - Express.js REST API

An Instagram Clone backend service built with Node.js and Express. It provides in-memory state management for user profiles, photo posts, reverse-chronological feeds, and post likes.

---

## 🚀 Features & Completed Requirements

1. **Project Setup & Profile Endpoint (`GET /profile`)**
   - Configured Node.js project named `insta-clone` with Express.
   - Endpoint returns a sample user profile object containing `username`, `followers`, and `bio`.
   - Also supports querying any seeded user via `GET /profile?username=<name>` or `GET /profile/:username`, and viewing all seeded profiles via `GET /profiles`.

2. **Create Post Endpoint (`POST /post`)**
   - Accepts a JSON body with `imageUrl`, `caption`, and optional `username`.
   - Generates a unique `postId` for every new post.
   - Stores the post in the in-memory array initialized with `likes: 0`.
   - Returns the created post object with status `201 Created`.

3. **Feed Endpoint (`GET /feed`)**
   - Returns all posts in reverse-chronological order (newest first).
   - Uses `array.reverse()` on a cloned array (`[...posts].reverse()`) so repeated calls do not mutate the storage order.
   - Includes `username` and `caption` for each post, along with `postId`, `imageUrl`, `likes`, and `createdAt`.

4. **Like Feature (`POST /like`)**
   - Takes a `postId` in the JSON body (or URL parameter / query string).
   - Increments the like count for that post.
   - Returns the updated like count and success message.

5. **Realistic Seed Data (5 Profiles & 10 Posts)**
   - Pre-seeded with 5 distinct user profiles and 10 high-quality sample posts featuring Unsplash imagery, realistic captions, timestamps, and like counts.

---

## 🛠️ Installation & Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
The server will start listening at: `http://localhost:3000`

For live reloading during development:
```bash
npm run dev
```

### 3. Run Automated Tests
```bash
npm test
```

---

## 📚 API Endpoints Reference

### 1. User Profile: `GET /profile`
Returns the default sample user profile or a specific profile via query param.

- **URL**: `/profile` or `/profile?username=sophia_creates`
- **Method**: `GET`
- **Sample Response (200 OK)**:
```json
{
  "username": "alex_wanderer",
  "followers": 14200,
  "bio": "Capturing moments around the world 📸✈️ | Outdoor enthusiast & landscape photographer 🏔️",
  "name": "Alex Rivera",
  "following": 340,
  "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
}
```

**cURL command**:
```bash
curl http://localhost:3000/profile
```

---

### 2. Create Post: `POST /post`
Creates and stores a new post with a unique `postId`.

- **URL**: `/post`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "imageUrl": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
  "caption": "A quiet moment with coffee and clean code. ☕💻",
  "username": "tech_sam"
}
```
- **Sample Response (201 Created)**:
```json
{
  "message": "Post created successfully!",
  "post": {
    "postId": 11,
    "username": "tech_sam",
    "imageUrl": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    "caption": "A quiet moment with coffee and clean code. ☕💻",
    "likes": 0,
    "createdAt": "2026-11-03T06:10:00.000Z"
  }
}
```

**cURL command**:
```bash
curl -X POST http://localhost:3000/post \
  -H "Content-Type: application/json" \
  -d "{\"imageUrl\":\"https://images.unsplash.com/photo-1518791841217-8f162f1e1131\",\"caption\":\"A quiet moment with coffee and clean code. ☕💻\",\"username\":\"tech_sam\"}"
```

---

### 3. View Feed: `GET /feed`
Returns all posts in reverse order (newest first).

- **URL**: `/feed`
- **Method**: `GET`
- **Sample Response (200 OK)**:
```json
[
  {
    "postId": 11,
    "username": "tech_sam",
    "imageUrl": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    "caption": "A quiet moment with coffee and clean code. ☕💻",
    "likes": 0,
    "createdAt": "2026-11-03T06:10:00.000Z"
  },
  {
    "postId": 10,
    "username": "marcus_fit",
    "imageUrl": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    "caption": "Completed a 10km trail run at sunrise. Remember: your only competition is who you were yesterday 🏃‍♂️🔥",
    "likes": 489,
    "createdAt": "2026-11-03T07:00:00.000Z"
  }
]
```

**cURL command**:
```bash
curl http://localhost:3000/feed
```

---

### 4. Like a Post: `POST /like`
Increments the like count for the given post ID and returns the updated count.

- **URL**: `/like`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "postId": 10
}
```
- **Sample Response (200 OK)**:
```json
{
  "message": "Post liked successfully!",
  "postId": 10,
  "likes": 490,
  "updatedPost": {
    "postId": 10,
    "username": "marcus_fit",
    "imageUrl": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    "caption": "Completed a 10km trail run at sunrise. Remember: your only competition is who you were yesterday 🏃‍♂️🔥",
    "likes": 490,
    "createdAt": "2026-11-03T07:00:00.000Z"
  }
}
```

**cURL command**:
```bash
curl -X POST http://localhost:3000/like \
  -H "Content-Type: application/json" \
  -d "{\"postId\": 10}"
```

---

## 👥 Seed Profiles Summary

| Username | Full Name | Followers | Bio |
| :--- | :--- | :--- | :--- |
| `alex_wanderer` | Alex Rivera | 14,200 | Capturing moments around the world 📸✈️ \| Outdoor enthusiast & landscape photographer 🏔️ |
| `sophia_creates` | Sophia Chen | 8,950 | Digital designer & UI artist 🎨 \| Turning complex ideas into delightful visuals ✨ |
| `tech_sam` | Sam Miller | 23,400 | Full-Stack Dev & Open Source enthusiast 💻 \| Building the future one commit at a time 🚀 |
| `foodie_elena` | Elena Rostova | 5,600 | Culinary explorer & home chef 🍝🍷 \| Life is too short for boring meals! |
| `marcus_fit` | Marcus Vance | 11,200 | Personal trainer & wellness coach 🏋️‍♂️ \| Discipline over motivation 💪 |

