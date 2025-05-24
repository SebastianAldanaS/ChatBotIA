// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = '********';

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      }
    );

    const reply = response.data.candidates[0]?.content?.parts[0]?.text || 'No hay respuesta';
    res.json({ reply });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Error con Gemini' });
  }
});

app.listen(3001, () => {
  console.log('Servidor con Gemini corriendo en http://localhost:3001');
});
