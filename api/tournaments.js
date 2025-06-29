module.exports = (req, res) => {
    res.json({
        events: [
            {
                id: 1,
                name: "Pro Tour Modern Horizons 3",
                date: "2025-07-15",
                location: "Chicago, IL",
                prizePool: "$250,000",
                players: 847,
                game: "magic"
            },
            {
                id: 2,
                name: "Pokemon World Championships 2025", 
                date: "2025-08-20",
                location: "Honolulu, HI",
                prizePool: "$500,000",
                players: 1200,
                game: "pokemon"
            },
            {
                id: 3,
                name: "Yu-Gi-Oh World Championship",
                date: "2025-09-10", 
                location: "Tokyo, Japan",
                prizePool: "$300,000",
                players: 956,
                game: "yugioh"
            }
        ],
        count: 3,
        totalPrizePool: "$1,050,000",
        success: true
    });
};
