module.exports = (req, res) => {
    res.json({
        totalValue: 56300,
        holdings: [
            { name: "Black Lotus", value: 45000, change: 5.2 },
            { name: "Charizard Base Set", value: 8500, change: -2.1 },
            { name: "Blue Eyes White Dragon", value: 2800, change: 3.7 }
        ],
        dailyChange: 2.34,
        weeklyChange: 8.7,
        monthlyChange: 15.2,
        yearlyChange: 45.8,
        riskMetrics: {
            sharpeRatio: 1.47,
            beta: 1.15,
            alpha: 2.8,
            volatility: 23.5
        },
        allocation: { MTG: 65, Pokemon: 25, "Yu-Gi-Oh": 10 },
        live: true
    });
};
