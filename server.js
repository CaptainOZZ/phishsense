const express = require('express');
// const fetch = require('node-fetch');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_API_KEY = "AIzaSyDx_XaWHn5ZYu1MoXAx42sa9RYSLOddXv8";
const GOOGLE_API_URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`;

app.use(cors());
app.use(bodyParser.json());
const path = require('path');
app.use(express.static(__dirname));

// app.use(express.static('public'));

app.post('/api/check-url', async (req, res) => {
  const urlToCheck = req.body.url;

  const body = {
    client: {
      clientId: "phishsense-nigeria",
      clientVersion: "1.0"
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "POTENTIALLY_HARMFUL_APPLICATION"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: urlToCheck }]
    }
  };

  try {
    const response = await fetch(GOOGLE_API_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();
    res.json({ isUnsafe: Object.keys(result).length > 0 });
  } catch (error) {
    console.error('Error checking URL:', error);
    res.status(500).json({ error: 'Error checking URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
