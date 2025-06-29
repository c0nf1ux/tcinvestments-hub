module.exports = (req, res) => {
    const query = req.query.query || "";
    const game = req.query.game || "magic";
    
    res.json({
        query: query,
        game: game,
        results: [],
        count: 0,
        message: "External API integration pending",
        suggestion: "Try /api/cards for sample data",
        success: true
    });
};
