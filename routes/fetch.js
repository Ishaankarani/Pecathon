const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).json({ error: 'URL query parameter is required' });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SmallWebReader/1.0' 
            }
        });
        const data = await response.text();
        res.setHeader('Content-Type', 'application/xml');
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch target URL', details: error.message });
    }
});

module.exports = router;