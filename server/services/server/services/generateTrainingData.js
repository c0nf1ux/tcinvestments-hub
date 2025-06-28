// generateTrainingData.js - Create synthetic training data for AI model
const fs = require('fs');
const path = require('path');

function generateTrainingData(samples = 5000) {
  console.log(' Generating training data...');
  
  const data = [];
  const labels = [];
  
  for (let i = 0; i < samples; i++) {
    // Generate realistic features
    const rsi = Math.random() * 100;
    const macd = (Math.random() - 0.5) * 2;
    const volume = Math.random();
    const sentiment = Math.random();
    const tournament = Math.random();
    const supply = Math.random();
    const rarity = Math.random();
    const age = Math.random();
    const meta = Math.random();
    const marketCap = Math.random();
    const volatility = Math.random() * 0.5 + 0.1;
    const seasonal = Math.random();
    
    // Calculate realistic price change based on features
    let priceChange = 0;
    
    // RSI influence
    if (rsi < 30) priceChange += 0.15;      // Oversold -> up
    if (rsi > 70) priceChange -= 0.15;      // Overbought -> down
    
    // MACD influence
    priceChange += macd * 0.1;
    
    // Sentiment influence
    priceChange += (sentiment - 0.5) * 0.2;
    
    // Tournament activity
    priceChange += tournament * 0.08;
    
    // Supply shortage
    priceChange += supply * 0.12;
    
    // Rarity premium
    priceChange += rarity * 0.05;
    
    // Meta relevance
    priceChange += meta * 0.1;
    
    // Add some noise
    priceChange += (Math.random() - 0.5) * 0.1;
    
    // Clamp to reasonable range
    priceChange = Math.max(-0.5, Math.min(0.5, priceChange));
    
    data.push([rsi, macd, volume, sentiment, tournament, supply, 
               rarity, age, meta, marketCap, volatility, seasonal]);
    labels.push(priceChange);
  }
  
  // Save training data
  const trainingData = {
    features: data,
    labels: labels,
    metadata: {
      samples: samples,
      features: 12,
      generated: new Date().toISOString()
    }
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'ai-training-data.json'),
    JSON.stringify(trainingData, null, 2)
  );
  
  console.log(` Generated ${samples} training samples`);
  return trainingData;
}

// Generate data if run directly
if (require.main === module) {
  const samples = process.argv[2] ? parseInt(process.argv[2]) : 5000;
  generateTrainingData(samples);
}

module.exports = { generateTrainingData };
