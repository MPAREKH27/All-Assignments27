const EventEmitter = require('events');

// Create an instance of EventEmitter
const notificationSystem = new EventEmitter();

// Event Listener: 'newMessage'
notificationSystem.on('newMessage', () => {
  console.log('You have a new message!');
});

// Event Listener: 'newFollower' (with username data parameter)
notificationSystem.on('newFollower', (username) => {
  console.log(`You are followed by ${username}`);
});

// --- Demonstrating / Triggering Events ---
console.log('=== Notification System Demo ===');

// Triggering 'newMessage' event
notificationSystem.emit('newMessage');

// Triggering 'newFollower' event with follower's username
notificationSystem.emit('newFollower', 'alex_dev');
notificationSystem.emit('newMessage');
notificationSystem.emit('newFollower', 'sarah_code');
