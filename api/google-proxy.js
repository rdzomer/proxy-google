import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Adiciona headers de CORS em toda resposta!
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde imediatamente a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx94piyVUTpRuJA2Iu21y7waBI1XljcZ0ZWlsOt7w1WtR2oth9bKzj9j6K-MrsLwDkf4A/exec";
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      // Para evitar erro de JSON, tente parsear ou enviar como texto:
      let data;
      try {
        data = await response.json();
      } catch {
        data = await response.text();
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(typeof data === 'string' ? data : JSON.stringify(data));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
