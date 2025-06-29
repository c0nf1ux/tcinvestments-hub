const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/portfolio', (req, res) => {
  res.json({
    totalValue: 56300,
    holdings: [
      { name: "Black Lotus", value: 45000 },
      { name: "Charizard Base Set", value: 8500 }
    ],
    dailyChange: 2.34
  });
});

module.exports = app;
