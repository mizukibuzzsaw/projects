// backend.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/owstats/:battletag', async (req, res) => {
    const battletag = req.params.battletag;
    const apiUrl = `https://overfast-api.tekrop.fr/players/${encodeURIComponent(battletag)}/stats/summary`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) return res.status(response.status).json({ error: 'API Error' });
        const data = await response.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});
