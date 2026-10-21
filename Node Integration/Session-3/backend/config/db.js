const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_session3';
    
    // Task 5: Using async/await instead of mongoose.connect().then().catch()
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Fast fail for error handling test
    });

    console.log(`[MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    // Task 4: Error handling for failed database connection
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // We log and return null rather than crashing so the server can still
    // return proper 503 error responses to the frontend
    return null;
  }
};

module.exports = connectDB;
