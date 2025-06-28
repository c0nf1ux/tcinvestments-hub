const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
 res.json({ message: 'Emergency Brainstorm Server', status: 'working' });
});

app.get('/api/health', (req, res) => {
 res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
 console.log(`Emergency server on port ${PORT}`);
});

