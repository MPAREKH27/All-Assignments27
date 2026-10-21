// task2_trending_shows.js
// Node.js script using axios to fetch trending shows from TVMaze API
// Displays the first 5 show names in the console.

const axios = require('axios');

const API_URL = 'https://api.tvmaze.com/shows';

console.log('Fetching trending shows from TVMaze API...');
console.log(`Endpoint: ${API_URL}\n`);

axios.get(API_URL)
    .then(response => {
        const shows = response.data;
        const first5Shows = shows.slice(0, 5);

        console.log('--------------------------------------------------');
        console.log('🎬 TOP 5 TRENDING SHOWS FROM TVMAZE:');
        console.log('--------------------------------------------------');

        first5Shows.forEach((show, index) => {
            console.log(`${index + 1}. ${show.name}`);
        });

        console.log('--------------------------------------------------');
        console.log(`Successfully fetched ${shows.length} shows in total.`);
    })
    .catch(error => {
        console.error('Error fetching shows with axios:', error.message);
    });
