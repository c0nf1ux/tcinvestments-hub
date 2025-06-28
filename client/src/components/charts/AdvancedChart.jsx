import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Grid, 
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  Psychology, 
  Timeline,
  Fullscreen,
  Settings
} from '@mui/icons-material';
import TradingViewChart from './TradingViewChart';

const AdvancedChart = ({ cardData, onPredictionUpdate }) => {
  const [showAIPredictions, setShowAIPredictions] = useState(true);
  const [aiPrediction, setAiPrediction] = useState(null);
  const [technicalIndicators, setTechnicalIndicators] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI prediction data
    const fetchAIPrediction = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const prediction = {
          direction: Math.random() > 0.5 ? 'up' : 'down',
          confidence: Math.floor(Math.random() * 40) + 60, // 60-100%
          targetPrice: cardData?.currentPrice * (1 + (Math.random() - 0.5) * 0.4),
          timeframe: '7 days',
          factors: [
            'Market sentiment trending positive',
            'Recent tournament results favorable',
            'Supply shortage detected',
            'Social media buzz increasing'
          ]
        };

        setAiPrediction(prediction);
        
        const indicators = {
          rsi: Math.floor(Math.random() * 100),
          macd: Math.random() > 0.5 ? 'bullish' : 'bearish',
          volume: Math.random() > 0.6 ? 'high' : 'normal',
          support: cardData?.currentPrice * 0.85,
          resistance: cardData?.currentPrice * 1.15
        };
        
        setTechnicalIndicators(indicators);
        setLoading(false);
        
        if (onPredictionUpdate) {
          onPredictionUpdate(prediction);
        }
      } catch (error) {
        console.error('Error fetching AI prediction:', error);
        setLoading(false);
      }
    };

    if (cardData) {
      fetchAIPrediction();
    }
  }, [cardData, onPredictionUpdate]);

  const getPredictionColor = () => {
    if (!aiPrediction) return '#CCCCFF';
    return aiPrediction.direction === 'up' ? '#66FF66' : '#FF6666';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#66FF66';
    if (confidence >= 60) return '#FFD700';
    return '#FF6666';
  };

  return (
    <Card
      sx={{
        backgroundColor: '#1a1a1a',
        border: '2px solid #CCCCFF',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Chart Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #CCCCFF',
            background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)'
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="h6"
                sx={{
                  color: '#CCCCFF',
                  fontWeight: 'bold'
                }}
              >
                {cardData?.name || 'Trading Card Chart'}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#9999FF' }}
              >
                Live Price: {'$'}{cardData?.currentPrice?.toFixed(2) || '0.00'}
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showAIPredictions}
                      onChange={(e) => setShowAIPredictions(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#CCCCFF',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#6666FF',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: '#CCCCFF', fontSize: '0.8rem' }}>
                      AI Predictions
                    </Typography>
                  }
                />
                <Tooltip title="Chart Settings">
                  <IconButton sx={{ color: '#CCCCFF' }}>
                    <Settings />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Fullscreen">
                  <IconButton sx={{ color: '#CCCCFF' }}>
                    <Fullscreen />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Main Chart */}
        <Box sx={{ position: 'relative' }}>
          <TradingViewChart
            symbol={cardData?.symbol || 'MTG:BLACKLOTUS'}
            height={500}
            realtime={true}
          />
          
          {/* AI Prediction Overlay */}
          {showAIPredictions && aiPrediction && !loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 2px solid ,
                borderRadius: '8px',
                p: 2,
                minWidth: 250,
                zIndex: 1000
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Psychology sx={{ color: '#CCCCFF', mr: 1 }} />
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#CCCCFF', fontWeight: 'bold' }}
                >
                  AI Prediction
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {aiPrediction.direction === 'up' ? (
                  <TrendingUp sx={{ color: '#66FF66', mr: 1 }} />
                ) : (
                  <TrendingDown sx={{ color: '#FF6666', mr: 1 }} />
                )}
                <Typography sx={{ color: getPredictionColor(), fontWeight: 'bold' }}>
                  {aiPrediction.direction.toUpperCase()}
                </Typography>
                <Chip
                  label={${aiPrediction.confidence}% confidence}
                  size="small"
                  sx={{
                    ml: 1,
                    backgroundColor: getConfidenceColor(aiPrediction.confidence),
                    color: '#000000',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
              
              <Typography
                variant="body2"
                sx={{ color: '#CCCCFF', mb: 1 }}
              >
                Target: 
              </Typography>
              
              <Typography
                variant="caption"
                sx={{ color: '#9999FF' }}
              >
                {aiPrediction.timeframe}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Technical Indicators Bar */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid #CCCCFF',
            backgroundColor: '#0a0a0a'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: '#9999FF' }}>
                  RSI
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: technicalIndicators.rsi > 70 ? '#FF6666' : 
                           technicalIndicators.rsi < 30 ? '#66FF66' : '#CCCCFF'
                  }}
                >
                  {technicalIndicators.rsi}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: '#9999FF' }}>
                  MACD
                </Typography>
                <Chip
                  label={technicalIndicators.macd}
                  size="small"
                  sx={{
                    backgroundColor: technicalIndicators.macd === 'bullish' ? '#66FF66' : '#FF6666',
                    color: '#000000',
                    textTransform: 'uppercase'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: '#9999FF' }}>
                  Volume
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: technicalIndicators.volume === 'high' ? '#FFD700' : '#CCCCFF',
                    textTransform: 'uppercase'
                  }}
                >
                  {technicalIndicators.volume}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: '#9999FF' }}>
                  S/R Levels
                </Typography>
                <Typography variant="body2" sx={{ color: '#CCCCFF' }}>
                   / 
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdvancedChart;
