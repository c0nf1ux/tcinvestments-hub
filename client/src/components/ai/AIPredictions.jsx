import React, { useState, useEffect } from 'react';

const AIPredictions = ({ cardId }) => {
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [analysis, setAnalysis] = useState([]);

  useEffect(() => {
    // Simulate advanced AI prediction
    const runAIAnalysis = () => {
      const scenarios = [
        { outcome: 'bullish', probability: 0.65, factors: ['market demand', 'scarcity', 'meta relevance'] },
        { outcome: 'bearish', probability: 0.25, factors: ['oversupply', 'reprint risk'] },
        { outcome: 'neutral', probability: 0.10, factors: ['market stability'] }
      ];
      
      const prediction = scenarios[0];
      setPrediction(prediction);
      setConfidence(85 + Math.random() * 10);
      setAnalysis([
        'Technical analysis shows strong support levels',
        'Social sentiment trending positive (+15%)',
        'Tournament meta driving demand',
        'Limited supply creating upward pressure'
      ]);
    };

    runAIAnalysis();
  }, [cardId]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(102,102,255,0.1), rgba(204,204,255,0.05))',
      border: '1px solid #6666FF',
      borderRadius: '12px',
      padding: '20px',
      margin: '16px 0'
    }}>
      <h3 style={{ color: '#CCCCFF', margin: '0 0 16px 0' }}> AI Market Analysis</h3>
      
      {prediction && (
        <>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: '#66FF66', fontSize: '1.2rem', fontWeight: 'bold' }}>
              {prediction.outcome.toUpperCase()} OUTLOOK
            </div>
            <div style={{ color: '#CCCCFF' }}>
              Confidence: {confidence.toFixed(1)}%
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ color: '#9999FF', margin: '0 0 8px 0' }}>Key Factors:</h4>
            {prediction.factors.map((factor, i) => (
              <div key={i} style={{ color: '#FFFFFF', marginBottom: '4px' }}>
                 {factor}
              </div>
            ))}
          </div>
          
          <div>
            <h4 style={{ color: '#9999FF', margin: '0 0 8px 0' }}>AI Analysis:</h4>
            {analysis.map((item, i) => (
              <div key={i} style={{ color: '#CCCCFF', marginBottom: '4px', fontSize: '0.9rem' }}>
                 {item}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AIPredictions;
