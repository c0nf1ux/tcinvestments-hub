module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const portfolioData = {
    totalValue: 56300,
    holdings: [
      { name: "Black Lotus", value: 45000 },
      { name: "Charizard Base Set", value: 8500 },
      { name: "Blue Eyes White Dragon", value: 2800 }
    ],
    dailyChange: 2.34,
    weeklyChange: 8.7,
    monthlyChange: 15.2,
    yearlyChange: 45.8,
    allocation: { MTG: 65, Pokemon: 25, "Yu-Gi-Oh": 10, Sports: 0 },
    riskMetrics: {
      portfolioVolatility: 23.5,
      sharpeRatio: 1.47,
      maxDrawdown: -12.3,
      beta: 1.15,
      alpha: 2.8
    }
  };

  res.json(portfolioData);
};
