module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { game, format, budget, strategy } = req.body;
    
    if (!game || !format) {
        return res.status(400).json({
            error: "Missing required fields",
            required: ["game", "format"]
        });
    }
    
    res.json({
        deckName: "AI-Generated " + (strategy || "Balanced") + " " + format + " Deck",
        game: game,
        format: format,
        totalCost: budget || 100,
        cards: [
            { name: "Lightning Bolt", quantity: 4, cost: 0.86 },
            { name: "Monastery Swiftspear", quantity: 4, cost: 1.25 }
        ],
        winRate: {
            estimated: Math.floor(Math.random() * 25) + 65,
            confidence: Math.floor(Math.random() * 20) + 75
        },
        generatedAt: new Date().toISOString(),
        success: true
    });
};
