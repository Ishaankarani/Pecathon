const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Mount separate action routes
app.use('/api/fetch', require('./routes/fetch'));
app.use('/api/discover', require('./routes/discover'));

app.listen(PORT, () => {
    console.log(`Server running cleanly at http://localhost:${PORT}`);
});