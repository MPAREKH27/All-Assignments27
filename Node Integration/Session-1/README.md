# Node Integration - Session 1 Assignment

This workspace contains complete, tested solutions for all 5 assignment questions in Session 1 of Node Integration.

## Quick Start
You can launch the all-in-one interactive dashboard:
```bash
npm install
npm start
```
Then visit: `http://localhost:3001` or open [index.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/index.html) directly in any browser.

---

## Assignment Tasks & Files

### 1. Simple Playlist Form with `fetch()`
- **HTML/JS File:** [task1_playlist_form.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task1_playlist_form.html)
- Submits `playlistName` and `description` as JSON to `https://jsonplaceholder.typicode.com/posts` via `fetch()`.

### 2. Trending TV Shows with `axios`
- **Node.js File:** [task2_trending_shows.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task2_trending_shows.js) (`npm run task2`)
- **Browser File:** [task2_trending_shows.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task2_trending_shows.html)
- Fetches `https://api.tvmaze.com/shows` and displays the first 5 show names in the console:
  1. *Under the Dome*
  2. *Person of Interest*
  3. *Bitten*
  4. *Arrow*
  5. *True Detective*

### 3. Cross-Origin (CORS) Error Observation
- **Backend API Server (port 5000):** [task3_server.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task3_server.js) (`npm run task3:server`)
- **Frontend App (port 3001):** [task3_cors_login.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task3_cors_login.html) (`npm run task3:frontend`)
- **Observed Browser Error Message:**
  > `Access to fetch at 'http://localhost:5000/api/login' from origin 'http://localhost:3001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
  > `TypeError: Failed to fetch`

### 4. Playlist Form with `response.ok` Status Check
- **HTML/JS File:** [task4_playlist_form.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task4_playlist_form.html)
- Evaluates `response.ok` to show custom success banners (HTTP 200–299) or error alerts (HTTP 4xx/5xx). Includes interactive buttons to test both success and 404 error responses.

### 5. Resilient Axios Error Handling
- **Node.js File:** [task5_trending_shows.js](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task5_trending_shows.js) (`npm run task5`)
- **Browser File:** [task5_trending_shows.html](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/task5_trending_shows.html)
- Handles network disconnects (`error.request`), wrong URLs / 404s (`error.response`), and displays user-friendly error banners.

---

For complete detailed explanations and written answers to every question, see [ASSIGNMENT_REPORT.md](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-1/ASSIGNMENT_REPORT.md).
