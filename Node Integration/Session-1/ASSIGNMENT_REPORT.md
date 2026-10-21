# Node Integration — Session 1: Assignment Report & Solutions

**Student / Developer:** Mohit Parekh  
**Module:** Node Integration & Asynchronous JavaScript  
**Topic:** Fetch API, Axios, Cross-Origin Resource Sharing (CORS), Response Status Checking, and Resilient Error Handling

---

## Table of Contents
1. [Question 1: Playlist Form with fetch()](#question-1-playlist-form-with-fetch)
2. [Question 2: Fetch Trending Shows with Axios](#question-2-fetch-trending-shows-with-axios)
3. [Question 3: Cross-Origin (CORS) Error Observation & Analysis](#question-3-cross-origin-cors-error-observation--analysis)
4. [Question 4: Response Status Validation with response.ok](#question-4-response-status-validation-with-responseok)
5. [Question 5: Resilient Axios Error Handling](#question-5-resilient-axios-error-handling)
6. [Project File Map & Running Instructions](#project-file-map--running-instructions)

---

## Question 1: Playlist Form with fetch()

### Requirements:
> Create a simple HTML form for adding a new playlist (fields: playlist name, description) and use `fetch()` to send the data as JSON to a dummy API endpoint (e.g., `https://jsonplaceholder.typicode.com/posts`) when the form is submitted.

### Implementation Details:
- **File:** [task1_playlist_form.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task1_playlist_form.html)
- **Method:** `POST`
- **Headers:** `'Content-Type': 'application/json'`
- **Payload:** Serialized using `JSON.stringify()`
- **Dummy API:** `https://jsonplaceholder.typicode.com/posts`

### Key Code Snippet:
```javascript
const form = document.getElementById('playlistForm');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents standard page reload

    const playlistName = document.getElementById('playlistName').value.trim();
    const description = document.getElementById('description').value.trim();

    const playlistData = {
        title: playlistName,
        playlistName: playlistName,
        body: description,
        description: description,
        userId: 1
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlistData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('[Task 1] API Response JSON:', data);
        form.reset();
    })
    .catch(error => {
        console.error('[Task 1] Fetch error:', error);
    });
});
```

---

## Question 2: Fetch Trending Shows with Axios

### Requirements:
> Use axios in a JavaScript file to fetch a list of trending movies from the API `https://api.tvmaze.com/shows` and display the first 5 show names in the console.  
> *Hint: Install axios using CDN or npm as needed.*

### Implementation Details:
- **Node.js Script:** [task2_trending_shows.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task2_trending_shows.js)
- **Browser Demo:** [task2_trending_shows.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task2_trending_shows.html)
- **Axios Installation:**
  - npm: `npm install axios`
  - CDN: `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`

### Node.js Code ([task2_trending_shows.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task2_trending_shows.js)):
```javascript
const axios = require('axios');

const API_URL = 'https://api.tvmaze.com/shows';

console.log('Fetching trending shows from TVMaze API...\n');

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
    })
    .catch(error => {
        console.error('Error fetching shows with axios:', error.message);
    });
```

### Actual Console Output Produced:
```text
Fetching trending shows from TVMaze API...
Endpoint: https://api.tvmaze.com/shows

--------------------------------------------------
🎬 TOP 5 TRENDING SHOWS FROM TVMAZE:
--------------------------------------------------
1. Under the Dome
2. Person of Interest
3. Bitten
4. Arrow
5. True Detective
--------------------------------------------------
Successfully fetched 240 shows in total.
```

---

## Question 3: Cross-Origin (CORS) Error Observation & Analysis

### Requirements:
> Build a login form (username, password) and attempt to POST the data to an API endpoint on a different port (e.g., localhost:5000 if your frontend runs on 3000). Observe the CORS error in the browser console and write down the error message you see.  
> *Hint: No need to fix CORS, just demonstrate and record the error.*

### Demonstration Environment:
- **Frontend Origin:** `http://localhost:3001` (serving [task3_cors_login.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task3_cors_login.html))
- **Backend API Origin:** `http://localhost:5000` (running [task3_server.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task3_server.js) with CORS headers intentionally omitted)
- **Target Endpoint:** `http://localhost:5000/api/login`

### Exact Recorded Browser Console Error Messages:

#### 1. Browser Security Policy Error (Red Alert in DevTools Console):
```text
Access to fetch at 'http://localhost:5000/api/login' from origin 'http://localhost:3001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
*(If a preflight `OPTIONS` request is triggered by custom headers or method):*
```text
Access to fetch at 'http://localhost:5000/api/login' from origin 'http://localhost:3001' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

#### 2. Network Tab Error:
```text
POST http://localhost:5000/api/login net::ERR_FAILED 200 (OK)
```

#### 3. JavaScript Promise Rejection (in `catch` block):
```text
TypeError: Failed to fetch
```

### Explanation of Why CORS Error Occurs:
1. **Definition of Origin:** In web browsers, an **Origin** is defined as the tuple: `(Protocol, Host, Port)`.
   - Frontend Origin: `http://localhost:3001`
   - Backend Origin: `http://localhost:5000`
   - Because the port numbers differ (`3001` vs `5000`), the browser classifies this as a **Cross-Origin request**.
2. **Same-Origin Policy (SOP):** Web browsers strictly enforce the Same-Origin Policy for security. JavaScript running on one origin is forbidden from accessing response data from another origin unless the receiving server explicitly grants permission via HTTP response headers:
   ```http
   Access-Control-Allow-Origin: http://localhost:3001
   (or Access-Control-Allow-Origin: *)
   ```
3. **The Block:** Since our backend server on port 5000 did not set the `Access-Control-Allow-Origin` header, the browser blocked the response and threw a CORS error in the console.

---

## Question 4: Response Status Validation with response.ok

### Requirements:
> Modify the fetch() call in your playlist form so that, after submitting, it displays a success or error message to the user based on the API response status.  
> *Hint: Use response.ok to check if the request was successful.*

### Implementation Details:
- **File:** [task4_playlist_form.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task4_playlist_form.html)
- **Mechanism:** `response.ok` is a read-only boolean on the Fetch `Response` object. It evaluates to `true` if `response.status` is in the range **200–299**, and `false` otherwise (e.g., 400, 404, 500).

### Key Code Snippet:
```javascript
try {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlistPayload)
    });

    // Check response.ok
    if (response.ok) {
        // HTTP Status 200-299 (e.g., 201 Created)
        const data = await response.json();
        displayMessage({
            type: 'success',
            title: 'Playlist Created Successfully!',
            details: `Status: ${response.status} (${response.statusText}) | ID: ${data.id}`
        });
        form.reset();
    } else {
        // HTTP Status outside 200-299 (e.g., 404 Not Found, 500 Server Error)
        displayMessage({
            type: 'error',
            title: `Submission Failed (HTTP ${response.status})`,
            details: `Server returned: ${response.statusText || 'Error status'}`
        });
    }
} catch (networkError) {
    // Catches network dropouts / DNS failures
    displayMessage({
        type: 'error',
        title: 'Network Error',
        details: networkError.message
    });
}
```

---

## Question 5: Resilient Axios Error Handling

### Requirements:
> Refactor your trending movies fetch code to handle and display a user-friendly error message if the API request fails (for example, if the internet is disconnected or the API URL is wrong).

### Implementation Details:
- **Node.js Script:** [task5_trending_shows.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task5_trending_shows.js)
- **Browser Demo:** [task5_trending_shows.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task5_trending_shows.html)
- **Error Categories Handled:**
  1. **HTTP Status Errors (`error.response`):** Server returned a 4xx or 5xx code (e.g., wrong URL route, bad gateway).
  2. **Network / Connection Drops (`error.request`):** Request was sent, but no response received (offline, DNS failure, timeout).
  3. **Configuration / Setup Errors (`error.message`):** Exception during request initialization.

### Key Code Snippet:
```javascript
try {
    const response = await axios.get(targetUrl, { timeout: 5000 });
    const shows = response.data;
    console.log(`Success! Loaded ${shows.length} shows.`);
} catch (error) {
    if (error.response) {
        // Server responded with non-2xx status (e.g. 404, 500)
        const status = error.response.status;
        if (status === 404) {
            showUserFriendlyMessage("⚠️ The requested TV show endpoint was not found (404). Please verify the API URL.");
        } else if (status >= 500) {
            showUserFriendlyMessage("⚠️ The TVMaze server is currently experiencing issues. Please try again later.");
        } else {
            showUserFriendlyMessage(`⚠️ Server error received (Status ${status}).`);
        }
    } else if (error.request) {
        // Request made but no response received (e.g. network disconnect, DNS failure)
        if (!navigator.onLine) {
            showUserFriendlyMessage("⚠️ You appear to be offline. Please check your internet connection.");
        } else {
            showUserFriendlyMessage("⚠️ Network error: Unable to reach the API server. Please check your connection.");
        }
    } else {
        showUserFriendlyMessage(`⚠️ Request error: ${error.message}`);
    }
}
```

---

## Project File Map & Running Instructions

| File | Purpose | How to Run |
|---|---|---|
| [index.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/index.html) | Interactive All-in-One Dashboard for all 5 tasks | Open in browser (`npm start` or double click) |
| [task1_playlist_form.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task1_playlist_form.html) | Task 1: Simple playlist form with fetch() | Open in browser |
| [task2_trending_shows.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task2_trending_shows.js) | Task 2: Node.js Axios fetch showing first 5 shows | `npm run task2` or `node task2_trending_shows.js` |
| [task2_trending_shows.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task2_trending_shows.html) | Task 2: Browser Axios fetch with console output mirror | Open in browser |
| [task3_server.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task3_server.js) | Task 3: Backend server on port 5000 (No CORS headers) | `npm run task3:server` |
| [task3_frontend_server.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task3_frontend_server.js) | Task 3: Frontend static server on port 3001 | `npm run task3:frontend` |
| [task3_cors_login.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task3_cors_login.html) | Task 3: Login form demonstrating CORS error | Access via `http://localhost:3001/task3_cors_login.html` |
| [task4_playlist_form.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task4_playlist_form.html) | Task 4: Form with response.ok check & status banners | Open in browser |
| [task5_trending_shows.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task5_trending_shows.js) | Task 5: Resilient Axios script with multi-case error handling | `npm run task5` or `node task5_trending_shows.js` |
| [task5_trending_shows.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task5_trending_shows.html) | Task 5: Interactive error simulation in browser | Open in browser |
| [package.json](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/package.json) | NPM configuration and dependencies | `npm install` |
