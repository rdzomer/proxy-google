import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Troque aqui pela sua URL do Apps Script:
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx94piyVUTpRuJA2Iu21y7waBI1XljcZ0ZWlsOt7w1WtR2oth9bKzj9j6K-MrsLwDkf4A/exec";
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.text();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
