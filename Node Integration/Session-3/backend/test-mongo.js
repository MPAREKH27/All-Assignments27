const mongoose = require('mongoose');

async function testConnection() {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/mern_session3');
    console.log('MongoDB Connected Successfully to:', conn.connection.name);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
}

testConnection();
