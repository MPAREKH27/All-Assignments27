// task5_trending_shows.js
// Refactored version of task2 with comprehensive error handling
// Displays user-friendly error messages when the API request fails (e.g., wrong URL, network failure).

const axios = require('axios');

/**
 * Fetches trending shows with robust, user-friendly error handling.
 * @param {string} url - The API endpoint to fetch from
 */
async function fetchTrendingShows(url = 'https://api.tvmaze.com/shows') {
    console.log(`\n======================================================`);
    console.log(`📡 Attempting to fetch shows from: ${url}`);
    console.log(`======================================================`);

    try {
        const response = await axios.get(url, {
            timeout: 5000 // 5 seconds timeout
        });

        const shows = response.data;
        if (!Array.isArray(shows)) {
            throw new Error('Unexpected response format: expected an array of shows.');
        }

        console.log(`✅ Success! Received ${shows.length} shows. First 5 trending shows:\n`);
        shows.slice(0, 5).forEach((show, index) => {
            console.log(`   ${index + 1}. ${show.name} (Rating: ${show.rating?.average || 'N/A'})`);
        });

    } catch (error) {
        console.log('\n❌ [ERROR DETECTED - Displaying User-Friendly Message]:');

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx (e.g. 404, 500)
            const status = error.response.status;
            const statusText = error.response.statusText;

            console.error(`⚠️  Server Error (${status} ${statusText}):`);
            if (status === 404) {
                console.error(`   👉 Friendly Message: "The requested API endpoint was not found. Please verify the URL."`);
            } else if (status >= 500) {
                console.error(`   👉 Friendly Message: "The TVMaze server is currently experiencing issues. Please try again later."`);
            } else {
                console.error(`   👉 Friendly Message: "Unable to retrieve shows due to server response code ${status}."`);
            }

        } else if (error.request) {
            // The request was made but no response was received (e.g. offline, DNS failure, timeout)
            if (error.code === 'ECONNABORTED') {
                console.error(`⚠️  Timeout Error:`);
                console.error(`   👉 Friendly Message: "The request timed out. The server took too long to respond."`);
            } else if (error.code === 'ENOTFOUND' || error.code === 'ERR_NETWORK') {
                console.error(`⚠️  Connection / Network Error:`);
                console.error(`   👉 Friendly Message: "Network connection failed. Please check your internet connection or URL domain."`);
            } else {
                console.error(`⚠️  Network Failure:`);
                console.error(`   👉 Friendly Message: "No response received from server (${error.code || 'Network Error'}). Check network connectivity."`);
            }

        } else {
            // Something happened in setting up the request that triggered an Error
            console.error(`⚠️  Configuration Error:`);
            console.error(`   👉 Friendly Message: "An unexpected error occurred while preparing your request: ${error.message}"`);
        }
    }
}

// Self-executing demonstration runner
async function runDemos() {
    console.log('--- TEST 1: Valid Endpoint (Expected to Succeed) ---');
    await fetchTrendingShows('https://api.tvmaze.com/shows');

    console.log('\n--- TEST 2: Wrong / 404 URL Endpoint (Expected to Fail gracefully) ---');
    await fetchTrendingShows('https://api.tvmaze.com/non_existent_shows_route_404');

    console.log('\n--- TEST 3: Invalid Domain / Disconnected Simulation (Expected to Fail gracefully) ---');
    await fetchTrendingShows('https://invalid-domain-does-not-exist-12345.xyz/shows');
}

// Allow passing custom URL from command line: node task5_trending_shows.js <url>
const customUrl = process.argv[2];
if (customUrl) {
    fetchTrendingShows(customUrl);
} else {
    runDemos();
}
