# Playlist App

A Node.js and Express REST API application for managing a music playlist, built with an object-oriented `Song` model, JSON request body parsing, and route input validation.

---

## Project Structure

```text
playlist-app/
├── package.json       # Project dependencies & scripts
├── song.js            # Song class model & initial sample data (3 songs)
├── index.js           # Express server with routes & validation middleware
├── test.js            # Automated test suite
└── README.md          # Project documentation & API guide
```

---

## 1. Setup & Installation

Navigate to the project directory and install dependencies:

```bash
cd playlist-app
npm install
```

Start the application:

```bash
npm start
```

Or run in watch mode:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

---

## 2. API Endpoints

### 1. Root Route
- **URL**: `GET /`
- **Description**: Returns welcome message.
- **Response**: `Welcome to Playlist App` (Status: `200 OK`)

### 2. Get All Songs
- **URL**: `GET /songs`
- **Description**: Returns all songs in JSON format.
- **Response**: `200 OK`
```json
[
  {
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "duration": 354
  },
  {
    "title": "Hotel California",
    "artist": "Eagles",
    "duration": 391
  },
  {
    "title": "Imagine",
    "artist": "John Lennon",
    "duration": 183
  }
]
```

### 3. Add a New Song
- **URL**: `POST /songs`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "title": "Levitating",
  "artist": "Dua Lipa",
  "duration": 203
}
```
- **Success Response**: `201 Created`
Returns the updated list of songs including the newly added track.

---

## 3. Validation Rules (POST /songs)

Input validation middleware ensures:
1. **`title`**: Must be provided, must be a string, and cannot be empty or whitespace-only.
2. **`duration`**: Must be a valid positive number strictly greater than 0 (representing length in seconds).

### Invalid Request Examples:
#### Missing or Empty Title:
```json
{
  "title": "",
  "artist": "Dua Lipa",
  "duration": 200
}
```
**Response (`400 Bad Request`)**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Title is required and cannot be empty."
  ]
}
```

#### Negative or Invalid Duration:
```json
{
  "title": "Levitating",
  "artist": "Dua Lipa",
  "duration": -50
}
```
**Response (`400 Bad Request`)**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Duration must be a positive number (in seconds)."
  ]
}
```

---

## 4. Running Tests

Run the built-in test suite:

```bash
npm test
```

