# Deploy-AIComponents.ps1
param([switch]$PredictionEngine, [switch]$PeriwinkleTheme)

Write-Host " DEPLOYING AI COMPONENTS" -ForegroundColor Magenta

$aiDir = "client/src/components/ai"
if (!(Test-Path $aiDir)) { New-Item -ItemType Directory -Path $aiDir -Force }

# Create AI Prediction Component
@"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { TrendingUp, TrendingDown, Analytics } from '@mui/icons-material';

const AIPrediction = ({ cardName, currentPrice }) => {
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    // Simulate AI prediction
    const simulateAI = () => {
      const change = (Math.random() - 0.5) * 20;
      const conf = Math.random() * 40 + 60; // 60-100% confidence
      
      setPrediction({
        priceChange: change,
        direction: change > 0 ? 'up' : 'down',
        targetPrice: currentPrice + change,
        timeframe: '7 days'
      });
      setConfidence(conf);
    };

    simulateAI();
  }, [cardName, currentPrice]);

  if (!prediction) return null;

  return (
    <Card className="ai-prediction" sx={{ 
      background: 'linear-gradient(90deg, rgba(204,204,255,0.1), rgba(153,153,255,0.1))',
      border: '1px solid #6666FF'
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Analytics sx={{ color: '#CCCCFF', mr: 1 }} />
          <Typography variant="h6" sx={{ color: '#CCCCFF' }}>
            AI Prediction
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={2}>
          {prediction.direction === 'up' ? 
            <TrendingUp sx={{ color: '#66FF66' }} /> : 
            <TrendingDown sx={{ color: '#FF6666' }} />
          }
          
          <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
            ${prediction.targetPrice.toFixed(2)} in {prediction.timeframe}
          </Typography>
          
          <Chip 
            label={`${confidence.toFixed(0)}% confidence`}
            sx={{ 
              background: 'linear-gradient(45deg, #CCCCFF, #9999FF)',
              color: '#000000'
            }}
          />
        </Box>
        
        <Typography variant="body2" sx={{ color: '#CCCCFF', mt: 1 }}>
          Expected {prediction.direction === 'up' ? 'gain' : 'loss'}: 
          ${Math.abs(prediction.priceChange).toFixed(2)} 
          ({((prediction.priceChange / currentPrice) * 100).toFixed(1)}%)
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AIPrediction;
"@ | Out-File -FilePath "$aiDir/AIPrediction.jsx" -Encoding UTF8

Write-Host " AI Components Created!" -ForegroundColor Green
Write-Host "Next: .\Deploy-IPOSystem.ps1" -ForegroundColor Yellow
