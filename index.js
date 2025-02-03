const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 4000;

// GitHub Raw File URL
const GITHUB_FILE_URL =
  "https://raw.githubusercontent.com/manjunath7890/files/main/telematics.ino.doitESP32devkitV1.bin";

// Proxy Route to Fetch and Send the File
app.get("/firmware", async (req, res) => {
  try {
    const response = await axios.get(GITHUB_FILE_URL, {
      responseType: "stream", // Get response as a stream
    });

    // Set headers to indicate a file download
    res.setHeader("Content-Disposition", "attachment; filename=firmware.bin");
    res.setHeader("Content-Type", "application/octet-stream");

    // Pipe the GitHub response to ESP32
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching firmware:", error);
    res.status(500).send("Failed to fetch firmware");
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
