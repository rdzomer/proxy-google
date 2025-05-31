const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

app.post('/api/google-proxy', async (req, res) => {
  // Troque abaixo pela SUA URL DO GOOGLE APPS SCRIPT!
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx94piyVUTpRuJA2Iu21y7waBI1XljcZ0ZWlsOt7w1WtR2oth9bKzj9j6K-MrsLwDkf4A/exec";

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  const data = await response.text();
  res.set('Content-Type', 'application/json');
  res.send(data);
});

module.exports = app;
