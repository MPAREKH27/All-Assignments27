const express = require('express');
const Room = require('./room');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON
app.use(express.json());

// Step 5 (Updated from Step 3): Sample data of 5 unique rooms using the Room model
const rooms = [
  new Room(
    'Sunset Beachfront Villa',
    'Goa',
    8500,
    ['Private Pool', 'Beach Access', 'Free Wi-Fi', 'Air Conditioning', 'Ocean View']
  ),
  new Room(
    'Cozy Pine Alpine Chalet',
    'Manali',
    4200,
    ['Mountain View', 'Fireplace', 'Balcony', 'Room Heater', 'Free Wi-Fi']
  ),
  new Room(
    'Royal Heritage Haveli Suite',
    'Jaipur',
    6800,
    ['Traditional Courtyard', 'Free Breakfast', 'Swimming Pool', 'Free Wi-Fi', 'Valet Parking']
  ),
  new Room(
    'Modern Skyline Studio',
    'Mumbai',
    3500,
    ['City View', 'High-Speed Wi-Fi', 'Kitchenette', 'Gym Access', 'Smart TV']
  ),
  new Room(
    'Tranquil Backwater Wooden Cottage',
    'Alleppey',
    5200,
    ['Lakefront View', 'Private Boat Ride', 'Complimentary Breakfast', 'Air Conditioning', 'Lush Garden']
  )
];

// Step 1: Homepage route displaying 'Welcome to StayEZ'
app.get('/', (req, res) => {
  res.send('Welcome to StayEZ');
});

// Step 4: Search route to filter rooms by location
// Hint: req.query is used to access query parameters
app.get('/rooms/search', (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({
      error: "Query parameter 'location' is required. E.g. /rooms/search?location=Goa"
    });
  }

  const queryLocation = location.trim().toLowerCase();
  const matchedRooms = rooms.filter((room) =>
    room.location.toLowerCase().includes(queryLocation)
  );

  res.json(matchedRooms);
});

// Step 3 & Step 5: Endpoint returning all rooms in JSON format
app.get('/rooms', (req, res) => {
  res.json(rooms);
});

// Start server only when run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`StayEZ server running at http://localhost:${PORT}`);
  });
}

module.exports = app;

