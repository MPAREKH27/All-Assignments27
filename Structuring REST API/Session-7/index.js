const express = require("express");
const app = express();

app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Server is running! 🚀");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
