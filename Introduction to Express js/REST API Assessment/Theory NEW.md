**Question:1. Why would you refactor this code to use async/await instead of nested callbacks, and how does async/await improve both the readability and error-handling of your Node.js application?**



**-->** Nested callbacks push code rightward ("callback hell"), and the logic reads inside-out. Async/await lets asynchronous steps read top to bottom like synchronous code, so the flow of the program matches the order you read it. Sequencing, loops, and conditionals over async work become natural instead of requiring recursion or helper libraries.



**Question:2. How would you implement error handling in this Node.js async module to ensure any**

**failure — including network errors and unexpected gateway responses — is caught and returned**

**to the caller without crashing the server process?**



\--> try/catch catches network errors, and res.ok catches bad gateway statuses.

The timeout prevents hangs.

next(err) sends unexpected errors to central middleware, since Express 4 doesn't catch async errors.

The unhandledRejection handler is a safety net only.



**Question:3. How would you design a custom Express middleware function for this logging**

**requirement, and where in the middleware chain should it be placed to ensure all requests are**

**captured, including those rejected early?**



**-->** Write a (req, res, next) function that records the start time, then hooks res.on('finish') to log method, URL, status, and duration. Place it first, before body parsers, CORS, and auth, so requests rejected early (401, 404, malformed body) are still captured.





**Question:4 How would you structure this Express application using an MVC pattern to separate**

**routing from controller logic, and what advantage does this separation provide when the same**

**business logic must serve multiple clients?**



**-->** routes/     -> maps URL + method to a controller

controllers/-> handles req/res, calls services/models

models/     -> data access and business rules



Business logic lives outside routes, so a web app, mobile app, or another service can reuse it, and only the thin controller/view layer changes per client. It is also easier to test and maintain.



**Question:5 How does JWT-based authentication allow a stateless Node.js REST API to verify a**

**user's identity on every request, and what information is appropriate to store in the JWT payload**

**versus what should never be included?**



**-->** Appropriate in payload: user ID, role/permissions, issued-at (iat), expiry (exp).

Never include: passwords, API keys, credit card numbers, or any sensitive personal data. The payload is only Base64-encoded, not encrypted, so anyone can read it.



**Question:6 How would you configure multer in Express to enforce file type and size limits on the**

**upload endpoint, and why is server-side validation still necessary even when the frontend**

**already enforces these same constraints?**



**-->** Frontend checks are easily bypassed with curl, Postman, or edited browser code. The server is the only trusted boundary, so it must enforce limits to prevent malicious or oversized uploads. For stronger safety, also verify actual file content (magic bytes), since mimetype can be spoofed.





