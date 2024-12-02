const express = require("ultimate-express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const port = 3000;

// Initialize app with HTTPS options
const app = express({
  uwsOptions: {
    //key_file_name: path.join(__dirname, "server/key.pem"),
    //cert_file_name: path.join(__dirname, "server/cert.pem"),
  },
});

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Route to retrieve data from the JSON file
app.get("/", (req, res) => {
  const key = req.query.key;
  console.log(key);
  if (!key) {
    return res.status(400).send("Missing key");
  }

  const filePath = path.join(__dirname, "shiftData.json");

  console.log(filePath);
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Data file not found");
  }

  // Read and parse the JSON data
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  console.log(data);

  res.status(200).json(data);
});

// Route to update data in the JSON file
app.put("/", (req, res) => {
  const { key, value } = req.body;
  if (!key || value === undefined) {
    return res.status(400).send("Missing key or value");
  }

  const filePath = path.join(__dirname, "shiftData.json");
  let data = {};

  // Check if the file exists, if it does, read and parse the data
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  // Update or add the new key-value pair
  data[key] = value;

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  res.status(200).send("Data stored successfully");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});