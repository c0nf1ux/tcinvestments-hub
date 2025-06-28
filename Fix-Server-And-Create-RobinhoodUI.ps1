# Fix-Server-And-Create-RobinhoodUI.ps1
Write-Host " FIXING SERVER & CREATING ROBINHOOD-STYLE UI" -ForegroundColor Magenta

# Fix server syntax error
Write-Host "Fixing server.js..." -ForegroundColor Yellow
@"
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Generate portfolio history
function generatePortfolioHistory(days = 365) {
  const data = [];
  let baseValue = 100000;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dailyChange = (Math.random() - 0.48) * 0.03;
    baseValue *= (1 + dailyChange);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(baseValue * 100) / 100,
      change: dailyChange
    });
  }
  return data;
}

// Sample cards with all features
const sampleCards = [
  {
    id: 1, name: 'Black Lotus', game: 'MTG', price: 45000, change: 5.2,
    prediction: { direction: 'up', confidence: 85, target: 47340 },
    social: { mentions: 1247, sentiment: 0.8 },
    nft: { tokenId: 'BL001', blockchain: 'Ethereum', verified: true }
  },
  {
    id: 2, name: 'Charizard Base Set', game: 'Pokemon', price: 8500, change: -2.1,
    prediction: { direction: 'down', confidence: 72, target: 8322 },
    social: { mentions: 892, sentiment: 0.6 },
    nft: { tokenId: 'CHAR001', blockchain: 'Polygon', verified: true }
  }
];

// API Routes
app.get('/api/portfolio/history/:timeframe', (req, res) => {
  const { timeframe } = req.params;
  let days = timeframe === '1D' ? 1 : timeframe === '1W' ? 7 : 30;
  res.json({ timeframe, data: generatePortfolioHistory(days) });
});

app.get('/api/cards', (req, res) => res.json(sampleCards));
app.get('/api/watchlist', (req, res) => res.json(sampleCards.slice(0, 4)));

app.listen(PORT, () => {
  console.log(' CardHood Server running on port ' + PORT);
  console.log(' Theme: Periwinkle & Black');
});
"@ | Out-File -FilePath "server.js" -Encoding UTF8 -Force

Write-Host " Server fixed!" -ForegroundColor Green
