const express = require('express');
const router = express.Router();

// In-memory store for anonymous batches (Hackathon MVP database)
let anonymousSubmissions = [];

// Submit Subscriptions Anonymously
router.post('/submit', (req, res) => {
    const { feeds } = req.body;
    if (!Array.isArray(feeds) || feeds.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty feed list' });
    }
    
    // Store anonymous batch (capped at 50 feeds)
    anonymousSubmissions.push(feeds.slice(0, 50));
    res.json({ success: true, message: 'Subscriptions submitted anonymously.' });
});

// Get Recommendations based on co-subscriptions
router.get('/recommendations', (req, res) => {
    const counts = {};
    anonymousSubmissions.forEach(batch => {
        batch.forEach(feed => {
            counts[feed] = (counts[feed] || 0) + 1;
        });
    });

    const sortedFeeds = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([feed, score]) => ({ feed, score }));

    res.json({ recommendations: sortedFeeds });
});

module.exports = router;