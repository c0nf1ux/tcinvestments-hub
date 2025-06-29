module.exports = (req, res) => {
    res.json({
        articles: [
            {
                id: 1,
                title: "AI Predicts Pikachu Illustrator to Hit $360K",
                summary: "95% confidence prediction shows continued upward trend",
                date: "2025-06-28",
                source: "CardHood AI",
                category: "prediction"
            },
            {
                id: 2,
                title: "Trading Card Market Hits Record $12.6B",
                summary: "Global TCG market shows institutional adoption",
                date: "2025-06-27",
                source: "Market Research",
                category: "market"
            },
            {
                id: 3,
                title: "Portfolio Analytics Show 45.8% Yearly Gains",
                summary: "Advanced risk metrics reveal strong performance",
                date: "2025-06-26",
                source: "CardHood Analytics",
                category: "portfolio"
            }
        ],
        count: 3,
        success: true
    });
};
