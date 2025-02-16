const express = require("express");

const app = express(); 

app.use("/test", (req, res) => {
    res.send("test file");
});

app.use((req, res) => {
  // request-handler
  // Configured to send this response to every request
  res.send("Hello from the server!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
