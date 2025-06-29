module.exports = (req, res) => {
    res.json([
        {
            id: 1,
            name: "Black Lotus",
            game: "MTG",
            price: 45000,
            change: 5.2,
            prediction: { 
                direction: "up", 
                confidence: 85, 
                target: 47340,
                timeframe: "7d"
            },
            social: {
                mentions: 1247,
                sentiment: 0.82,
                trending: 95
            }
        },
        {
            id: 2,
            name: "Pikachu Illustrator", 
            game: "Pokemon",
            price: 320000,
            change: 12.5,
            prediction: { 
                direction: "up", 
                confidence: 95, 
                target: 360000,
                timeframe: "30d"
            },
            social: {
                mentions: 2847,
                sentiment: 0.91,
                trending: 100
            }
        },
        {
            id: 3,
            name: "Blue Eyes White Dragon",
            game: "Yu-Gi-Oh",
            price: 2800,
            change: 3.7,
            prediction: {
                direction: "up",
                confidence: 68,
                target: 2904,
                timeframe: "7d"
            }
        }
    ]);
};
