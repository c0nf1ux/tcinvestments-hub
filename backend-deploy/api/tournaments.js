module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const tournamentsData = {
    events: [
      {
        id: 1,
        name: "Pro Tour Modern Horizons 3",
        game: "magic",
        format: "Modern",
        date: "2025-07-15",
        location: "Chicago, IL",
        venue: "McCormick Place",
        prizePool: "$250,000",
        players: 847,
        maxPlayers: 1000,
        status: "registration_open"
      }
    ],
    count: 4,
    upcoming: 3,
    registrationOpen: 2,
    totalPrizePool: "$1,100,000",
    success: true
  };

  res.json(tournamentsData);
};
