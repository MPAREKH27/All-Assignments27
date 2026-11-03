# StayEZ - Vacation Rental Platform

A Node.js and Express backend API for StayEZ vacation rental platform.

## Features & Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Displays `Welcome to StayEZ` on the homepage |
| `GET` | `/rooms` | Returns all 5 unique vacation rental rooms in JSON format |
| `GET` | `/rooms/search?location=<name>` | Filters and returns rooms matching the query `location` (case-insensitive) |

## Project Structure

```
├── app.js            # Express application entry file with all routes
├── room.js           # Room model class definition
├── package.json      # Dependencies and npm scripts
├── package-lock.json # Lockfile for npm dependencies
├── test.js           # Automated verification test script
└── README.md         # Project documentation
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
The server will start at: `http://localhost:3000`

### 3. Run Automated Tests
```bash
npm test
```

## Sample Data (5 Unique Rooms)
- **Sunset Beachfront Villa** (Goa) - ₹8,500/night
- **Cozy Pine Alpine Chalet** (Manali) - ₹4,200/night
- **Royal Heritage Haveli Suite** (Jaipur) - ₹6,800/night
- **Modern Skyline Studio** (Mumbai) - ₹3,500/night
- **Tranquil Backwater Wooden Cottage** (Alleppey) - ₹5,200/night

