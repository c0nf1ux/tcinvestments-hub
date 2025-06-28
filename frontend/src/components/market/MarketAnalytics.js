import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './MarketAnalytics.css';

const MarketAnalytics = () => {
    const [marketData, setMarketData] = useState([]);
    const [topGainers, setTopGainers] = useState([]);
    const [topLosers, setTopLosers] = useState([]);
    const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

    useEffect(() => {
        loadMarketData();
        loadTopMovers();
    }, [selectedTimeframe]);

    const loadMarketData = () => {
        const sampleData = [
            { time: '9:00', price: 125.40, volume: 2400 },
            { time: '10:00', price: 127.20, volume: 3200 },
            { time: '11:00', price: 129.80, volume: 2800 },
            { time: '12:00', price: 131.45, volume: 3600 },
            { time: '13:00', price: 128.90, volume: 4100 },
            { time: '14:00', price: 132.15, volume: 3800 },
            { time: '15:00', price: 134.70, volume: 4500 }
        ];
        setMarketData(sampleData);
    };

    const loadTopMovers = () => {
        setTopGainers([
            { name: 'Black Lotus', price: '$45,000', change: '+12.5%', volume: '$2.1M' },
            { name: 'Mox Ruby', price: '$8,440', change: '+8.3%', volume: '$890K' },
            { name: 'Charizard Base', price: '$6,800', change: '+6.2%', volume: '$1.2M' },
            { name: 'Ancestral Recall', price: '$12,500', change: '+5.8%', volume: '$450K' },
            { name: 'Time Walk', price: '$9,200', change: '+4.9%', volume: '$320K' }
        ]);

        setTopLosers([
            { name: 'Jace TMS', price: '$180', change: '-3.2%', volume: '$95K' },
            { name: 'Tarmogoyf', price: '$85', change: '-2.8%', volume: '$67K' },
            { name: 'Snapcaster', price: '$45', change: '-2.1%', volume: '$34K' },
            { name: 'Liliana', price: '$120', change: '-1.9%', volume: '$78K' },
            { name: 'Elspeth', price: '$65', change: '-1.4%', volume: '$45K' }
        ]);
    };

    return (
        <div className="market-analytics">
            <div className="market-header">
                <h1> MTGStocks Destroyer</h1>
                <p className="market-subtitle">Advanced Market Analytics & Price Intelligence</p>
                <div className="destruction-badge">
                    <span className="competitor-killed"> MTGSTOCKS: ELIMINATED</span>
                    <span className="progress">Progress: 50% Market Domination (4/8 sites)</span>
                </div>
            </div>

            <div className="market-overview">
                <div className="overview-card">
                    <h3>Total Market Cap</h3>
                    <div className="metric-value">$2.4B</div>
                    <div className="metric-change positive">+5.2% (24h)</div>
                </div>
                <div className="overview-card">
                    <h3>Daily Volume</h3>
                    <div className="metric-value">$45.2M</div>
                    <div className="metric-change positive">+12.8% (24h)</div>
                </div>
                <div className="overview-card">
                    <h3>Avg Change</h3>
                    <div className="metric-value">+2.3%</div>
                    <div className="metric-change positive">+0.8% (24h)</div>
                </div>
                <div className="overview-card">
                    <h3>Active Cards</h3>
                    <div className="metric-value">15,247</div>
                    <div className="metric-change positive">+156 (24h)</div>
                </div>
            </div>

            <div className="chart-section">
                <div className="chart-header">
                    <h2>Market Price Trends</h2>
                    <div className="timeframe-selector">
                        {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map(tf => (
                            <button 
                                key={tf}
                                className={`timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                                onClick={() => setSelectedTimeframe(tf)}
                            >
                                {tf}
                            </button>
                        ))}
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={marketData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#00ff88" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="movers-section">
                <div className="gainers">
                    <h2> Top Gainers</h2>
                    <div className="movers-list">
                        {topGainers.map((card, index) => (
                            <div key={index} className="mover-item gainer">
                                <div className="card-info">
                                    <span className="card-name">{card.name}</span>
                                    <span className="card-price">{card.price}</span>
                                </div>
                                <div className="card-stats">
                                    <span className="change positive">{card.change}</span>
                                    <span className="volume">{card.volume}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="losers">
                    <h2> Top Losers</h2>
                    <div className="movers-list">
                        {topLosers.map((card, index) => (
                            <div key={index} className="mover-item loser">
                                <div className="card-info">
                                    <span className="card-name">{card.name}</span>
                                    <span className="card-price">{card.price}</span>
                                </div>
                                <div className="card-stats">
                                    <span className="change negative">{card.change}</span>
                                    <span className="volume">{card.volume}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="destruction-status">
                <h2> Market Domination Progress</h2>
                <div className="competitors-list">
                    <div className="competitor destroyed">
                        <span className="name">Robinhood</span>
                        <span className="status"> DESTROYED</span>
                        <span className="replacement">Superior Trading Interface</span>
                    </div>
                    <div className="competitor destroyed">
                        <span className="name">Scryfall</span>
                        <span className="status"> DESTROYED</span>
                        <span className="replacement">Multi-TCG Advanced Search</span>
                    </div>
                    <div className="competitor destroyed">
                        <span className="name">EDHREC</span>
                        <span className="status"> DESTROYED</span>
                        <span className="replacement">AI-Powered Deck Builder</span>
                    </div>
                    <div className="competitor destroyed current">
                        <span className="name">MTGStocks</span>
                        <span className="status"> DESTROYED</span>
                        <span className="replacement">Real-time Market Analytics</span>
                    </div>
                    <div className="competitor remaining">
                        <span className="name">TCGPlayer</span>
                        <span className="status"> NEXT TARGET</span>
                        <span className="replacement">Integrated Marketplace</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketAnalytics;
