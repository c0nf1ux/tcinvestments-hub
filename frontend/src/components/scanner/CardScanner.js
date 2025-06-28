import React, { useState } from 'react';
import './CardScanner.css';

const CardScanner = ({ onCardScanned, onClose }) => {
  const [scanResult, setScanResult] = useState(null);

  const mockScan = () => {
    const mockCards = [
      {
        id: Date.now(),
        name: "Charizard",
        set: "Base Set", 
        tcg: "Pokemon",
        rarity: "Holo Rare",
        currentPrice: 6800,
        change24h: 450,
        changePercent: "+7.1%",
        priceHistory: [
          { time: "1d", price: 6350 },
          { time: "12h", price: 6520 },
          { time: "6h", price: 6680 },
          { time: "3h", price: 6750 },
          { time: "1h", price: 6800 }
        ],
        image: "",
        category: "WOTC Vintage"
      }
    ];
    
    const randomCard = mockCards[0];
    setScanResult(randomCard);
  };

  const addToCollection = () => {
    if (scanResult && onCardScanned) {
      onCardScanned(scanResult);
      onClose();
    }
  };

  return (
    <div className="card-scanner-overlay">
      <div className="scanner-container">
        <div className="scanner-header">
          <h3> Card Scanner</h3>
          <button className="close-btn" onClick={onClose}></button>
        </div>

        <div className="scanner-content">
          {!scanResult ? (
            <div className="scanner-start">
              <div className="scanner-icon"></div>
              <h4>Scan Your Trading Cards</h4>
              <p>Demo mode - Click scan to add a sample card</p>
              <button className="start-camera-btn" onClick={mockScan}>
                 Demo Scan
              </button>
            </div>
          ) : (
            <div className="scan-result">
              <h4>Card Identified!</h4>
              <div className="result-card">
                <div className="result-header">
                  <span className="result-emoji">{scanResult.image}</span>
                  <div className="result-info">
                    <div className="result-name">{scanResult.name}</div>
                    <div className="result-meta">{scanResult.set}  {scanResult.rarity}</div>
                  </div>
                </div>
                <div className="result-price"></div>
                <div className="result-actions">
                  <button className="add-card-btn" onClick={addToCollection}>
                     Add to Collection
                  </button>
                  <button className="scan-again-btn" onClick={() => setScanResult(null)}>
                     Scan Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardScanner;
