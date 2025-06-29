module.exports = (req, res) => {
    res.json({
        status: "OK",
        version: "2.0.0",
        uptime: process.uptime(),
        message: "CardHood - AI Trading Card Platform",
        features: ["AI Predictions", "Portfolio Analytics", "Real-time Data", "Risk Metrics"],
        timestamp: new Date().toISOString(),
        server: "Vercel Production"
    });
};
