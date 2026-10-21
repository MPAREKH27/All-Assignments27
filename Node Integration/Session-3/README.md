# MERN Stack Integration — Session 3 Assignment

A full-stack MERN application demonstrating end-to-end integration between a **React frontend**, an **Express/Node.js backend**, and a **MongoDB database** via **Mongoose**.

---

## 📋 Tasks Implemented

### Task 1: Playlist Creation POST Flow
- **Endpoint**: `POST /playlists`
- **Controller**: `controllers/playlistController.js`
- **Mongoose Model**: `models/Playlist.js`
- **React Component**: `src/components/Task1Playlist.jsx`
- **Workflow**:
  1. The user inputs a playlist name on the React frontend.
  2. The frontend sends a `POST` request with JSON `{ "name": "..." }` to the Node backend.
  3. The backend receives the name and saves it into MongoDB via Mongoose using `async/await`.
  4. The backend returns a 201 Created response:
     ```json
     {
       "success": true,
       "message": "Playlist \"<name>\" created successfully!",
       "playlist": { "_id": "...", "name": "...", "createdAt": "..." }
     }
     ```
  5. The frontend displays a success alert banner with the backend's confirmation message and appends the new playlist to the reactive UI list.

---

### Task 2: Restaurant Form & Saved Object Return
- **Endpoint**: `POST /restaurants` & `GET /restaurants`
- **Controller**: `controllers/restaurantController.js`
- **Mongoose Model**: `models/Restaurant.js`
- **React Component**: `src/components/Task2Restaurant.jsx`
- **Workflow**:
  1. The React form collects: `name`, `cuisine`, and `rating` (1–5 scale).
  2. On submit, sends a `POST` request to `http://localhost:5000/restaurants`.
  3. The backend validates the inputs (ensuring non-empty strings and rating between 1 and 5), saves the document to the MongoDB `restaurants` collection, and returns the saved restaurant object:
     ```json
     {
       "success": true,
       "message": "Restaurant \"...\" saved successfully!",
       "restaurant": {
         "_id": "6ad8c230a44d5e16d534eefd",
         "name": "Trattoria Bella Vista",
         "cuisine": "Italian",
         "rating": 5,
         "createdAt": "..."
       }
     }
     ```
  4. The frontend updates state with the returned saved restaurant object, shows a "Newly Saved" indicator, and renders the JSON inspector.

---

### Task 3: Movie Catalog GET Endpoint
- **Endpoint**: `GET /movies`
- **Controller**: `controllers/movieController.js`
- **Mongoose Model**: `models/Movie.js`
- **React Component**: `src/components/Task3Movies.jsx`
- **Workflow**:
  1. The Node backend defines `GET /movies` which queries MongoDB using `await Movie.find().sort({ releaseYear: -1 })`.
  2. Returns the array of movie documents as pure JSON.
  3. The React frontend calls `fetch('http://localhost:5000/movies')` inside `useEffect` (and via a "Fetch /movies" button) and renders the movie cards with titles, genres, ratings, and release years.
  4. Includes a seeding endpoint (`POST /movies/seed`) to populate sample cinematic movies (*Inception*, *Interstellar*, *The Dark Knight*, *Spirited Away*, *Pulp Fiction*).

---

### Task 4: Error Handling in the MERN Flow
- **Components Involved**:
  - Backend: `server.js` centralized error middleware, database connection check (`mongoose.connection.readyState === 1`), schema validation handlers.
  - Frontend: `src/components/Task4ErrorHandling.jsx`, `src/App.jsx` alert banner system.
- **Workflow**:
  - If the backend fails to connect to MongoDB, or MongoDB drops offline, endpoints return HTTP 503:
    ```json
    {
      "success": false,
      "error": "Database connection failed: MongoDB is currently disconnected or unavailable."
    }
    ```
  - If a save operation fails (e.g., empty playlist name or invalid rating outside 1–5), the backend returns HTTP 400:
    ```json
    {
      "success": false,
      "error": "Validation failed: Playlist name cannot be empty."
    }
    ```
  - The frontend catches non-200 responses or network errors, sends the error to `onShowAlert`, and displays an error alert with the exact message from the backend.
  - An interactive test bench is provided in the UI to test:
    - Empty Playlist Save Error (HTTP 400)
    - Invalid Restaurant Rating (HTTP 400)
    - Simulated Database Disconnection (HTTP 503)
    - Simulated Mongoose Save Crash (HTTP 500)

---

### Task 5: Async/Await Backend Refactoring
- **Refactoring Details**:
  All MongoDB operations in the Node backend have been refactored from legacy `.then()/.catch()` promise chaining to modern `async/await` syntax with structured `try/catch` blocks.
- **Code Comparison**:

#### Before (Legacy Promise Chaining):
```javascript
exports.createPlaylist = (req, res) => {
  const { name } = req.body;
  const newPlaylist = new Playlist({ name });
  newPlaylist.save()
    .then(saved => {
      res.status(201).json({ success: true, message: 'Saved!', playlist: saved });
    })
    .catch(err => {
      res.status(400).json({ success: false, error: err.message });
    });
};
```

#### After (Task 5: Refactored with `async/await` and `try/catch`):
```javascript
exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Playlist name cannot be empty.' });
    }

    const newPlaylist = new Playlist({ name: name.trim() });
    const savedPlaylist = await newPlaylist.save(); // Await Mongoose operation

    return res.status(201).json({
      success: true,
      message: `Playlist "${savedPlaylist.name}" created successfully!`,
      playlist: savedPlaylist
    });
  } catch (error) {
    // Robust try/catch error handling
    return res.status(500).json({ success: false, error: error.message });
  }
};
```

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v18+ or v24+)
- MongoDB Community Server running locally on `127.0.0.1:27017`

### 1. Run the Backend Server
```bash
cd backend
npm install
npm start
```
*Backend runs on: `http://localhost:5000`*

### 2. Run the React Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on: `http://localhost:3001` (or `http://localhost:3000`)*

### 3. Run Automated API Test Suite
```bash
node test-api.js
```
