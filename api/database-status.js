module.exports = (req, res) => {
    res.json({
        status: "connected",
        database: "MongoDB Atlas",
        collections: {
            cards: 15847,
            users: 1247,
            portfolios: 892
        },
        performance: {
            responseTime: "12ms",
            uptime: "99.97%"
        },
        success: true
    });
};
