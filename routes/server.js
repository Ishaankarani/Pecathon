const cheerio = require('cheerio');

// New endpoint to scrape full article text from a URL
app.get('/api/scrape', async (req, res) => {
    const articleUrl = req.query.url;
    try {
        const response = await fetch(articleUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        // Target common article body tags (adjust based on the site)
        let articleText = '';
        $('p').each((i, el) => {
            articleText += $(el).text() + '\n\n';
        });

        res.json({ content: articleText || 'Could not extract text.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to scrape article' });
    }
});